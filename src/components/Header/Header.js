/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
// import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {/* <Navigation /> */}
          <Link className={s.brand} to="/">
            <span className={s.brandTxt}>VAT IT</span>
          </Link>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>Ansibot</h1>
            <p className={s.bannerDesc}>Provision Your Dev Machine</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
