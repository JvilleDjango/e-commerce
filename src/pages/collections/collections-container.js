import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import { selectIsCollectionsLoaded } from "../../redux/shop/shopSelectors";
import WithSpinner from "../../components/with-spinner/with-spinner";
import Collections from "./collections";

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionsContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Collections);

export default CollectionsContainer;
