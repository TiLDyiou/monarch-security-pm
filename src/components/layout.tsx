import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '@/lib/sections'
import Footer from './sections/shared/footer'
import Navbar from './sections/shared/navbar'

const ScrollToTop = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0)
            return
        }
        // Landing sections are lazy-loaded: wait for the target, and re-align while sections above it
        // finish loading and shift the layout. Stop as soon as the user scrolls on their own.
        const id = decodeURIComponent(hash.slice(1))
        let ticks = 0
        let stable = 0
        const stop = () => window.clearInterval(timer)
        const timer = window.setInterval(() => {
            const el = document.getElementById(id)
            if (el) {
                const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
                const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
                if (!atBottom && Math.abs(el.getBoundingClientRect().top - margin) > 4) {
                    scrollToSection(id, 'auto')
                    stable = 0
                } else if (++stable >= 5) stop()
            }
            if (++ticks > 100) stop()
        }, 100)
        const events = ['wheel', 'touchstart', 'keydown'] as const
        events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }))
        return () => {
            stop()
            events.forEach((e) => window.removeEventListener(e, stop))
        }
    }, [pathname, hash])

    return null
}

const Layout = ({ children }) => {
    return (
        <main>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default Layout
