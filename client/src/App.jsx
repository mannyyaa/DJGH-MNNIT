import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { ToastProvider } from './context/ToastContext'
import { AdminProvider } from './context/AdminContext'

import Home         from './pages/Home'
import About        from './pages/About'
import Facilities   from './pages/Facilities'
import Mess         from './pages/Mess'
import Complaints   from './pages/Complaints'
import Notices      from './pages/Notices'
import Committee    from './pages/Committee'
import Rules        from './pages/Rules'
import FAQ          from './pages/FAQ'
import Contact      from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <ToastProvider>
      <AdminProvider>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'pt-16'}>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/facilities"  element={<Facilities />} />
          <Route path="/mess"        element={<Mess />} />
          <Route path="/complaints"  element={<Complaints />} />
          <Route path="/notices"     element={<Notices />} />
          <Route path="/committee"   element={<Committee />} />
          <Route path="/rules"       element={<Rules />} />
          <Route path="/faq"         element={<FAQ />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/admin/*"     element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      <Toast />
      </AdminProvider>
    </ToastProvider>
  )
}
