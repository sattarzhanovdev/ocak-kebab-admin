import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import { Routers } from '../pages'
import { Apps } from '../services/path'

function Routes() {
  return (
    <React.Fragment>
      <React.Suspense fallback={''}>
        <Switch>
          <Route path={Apps.main} element={<Routers.Main />} />
          <Route path={Apps.auth} element={<Routers.Auth />} />
          <Route path={Apps.foodsMore} element={<Routers.More />} />
          <Route path={Apps.products} element={<Routers.AddProducts />} />
          <Route path={Apps.addProducts} element={<Routers.Adding />} />
          <Route path={Apps.productsMore} element={<Routers.ProductsMore />} />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  )
}

export default Routes