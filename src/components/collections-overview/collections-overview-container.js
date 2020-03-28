import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {compose} from 'redux';

import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from "../../redux/shop/shopSelectors";
import WithSpinner from "../../components/with-spinner/with-spinner";

import CollectionsOverview from "../../components/collections-overview/collections-overview";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching, 
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;
