import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { firestore, convertCollectionsSnapShotToMap } from "../../firebase/firebase.utils";

import {updateCollections} from '../../redux/shop/shop-action';

import WithSpinner from '../../components/with-spinner/with-spinner';

import CollectionsOverview from "../../components/collections-overview/collections-overview";
import Collections from "../collections/collections";


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsWithSpinner = WithSpinner(Collections);

const ShopPage = ({ match, updateCollections, loading }) => {
  

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const collectionsRef = firestore.collection("collections");
    let unsubscribeFromSnapshot = null;

    unsubscribeFromSnapshot = collectionsRef.onSnapshot(async snapShot => {
      const collectionsMap =  convertCollectionsSnapShotToMap(snapShot);
      updateCollections(collectionsMap);
      setIsLoading(false)
    });
  }, []);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} />
      <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionsWithSpinner isLoading={loading} {...props}/>} />
    </div>
  );
};

const mapDispatchToProps = dispatch =>({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
