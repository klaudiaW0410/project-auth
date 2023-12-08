import { Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { SignInPage } from '../pages/SignInPage'
import { RegisterPage } from '../pages/RegisterPage'
import { PageNotFound } from '../pages/PageNotFound'

const routes = (
    <>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* <Route path='/tasks' element={} /> */}
        <Route path='/*' element={<PageNotFound />} />
        
    </>
)

export default routes