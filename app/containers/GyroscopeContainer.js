// import { connect } from 'react-redux';
// import { userLogout } from '../actions/actions';
// import Gyroscope from '../components/Gyroscope';
// import Exponent from 'exponent';


// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLogout: () => {
//       console.log('DISPATCH LOGOUT')
//       dispatch(userLogout());
//       Exponent.WebBrowser.openBrowserAsync('https://originalorcs.auth0.com/v2/logout');
//       Exponent.WebBrowser.dismissBrowser();
//       Exponent.Util.reload();
//     },
//   };
// };

// const GyroscopeContainer = connect(
//   null,
//   // {},
//   // mapDispatchToProps,
// )(Gyroscope);

// const GyroscopeContainer = connect(
//   // mapStateToProps,
//   // mapDispatchToProps,
// )(Gyroscope);

// export default GyroscopeContainer;