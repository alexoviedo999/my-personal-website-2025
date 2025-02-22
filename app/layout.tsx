import { Layout } from '@/components/dom/Layout'
import DropdownMenu from '@/components/dom/DropdownMenu'
import '@/global.css'
import Link from 'next/link'

export const metadata = {
  title: "Alejandro Oviedo's Website",
  description:
    'A website showcasing my software development skills including web development, genAI, React, Nextjs, React-three-fiber, and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <div className='bg-black data-[aria-hidden=true]:min-h-full'>
          <div className='navbar fixed top-0 z-50 w-full border-2 border-base-100/50 bg-base-100'>
            <div className='navbar-start'>
              <DropdownMenu />
            </div>
            <div className='navbar-center'>
              <Link href='/' className='btn btn-ghost text-xl normal-case'>
                Alejandro Oviedo
              </Link>
            </div>
            <div className='navbar-end'>
              <div className='order-1 items-center'>
                <a
                  aria-label='Github'
                  target='_blank'
                  href='https://github.com/alexoviedo999'
                  rel='noopener noreferrer'
                  className='btn btn-square btn-ghost drawer-button normal-case'
                >
                  <svg
                    width='20'
                    height='20'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    className='inline-block size-5 fill-current md:size-6'
                  >
                    <path d='M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z'></path>
                  </svg>
                </a>
              </div>
              <div className='order-2 items-center pr-2.5'>
                <a
                  aria-label='Twitter'
                  target='_blank'
                  href='https://twitter.com/alexoviedo999'
                  rel='noopener noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='fill-current'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
                  </svg>
                </a>
              </div>
              <div className='order-3 items-center pr-2.5'>
                <a
                  aria-label='Linkedin'
                  target='_blank'
                  href='https://www.linkedin.com/in/alejandrooviedo/'
                  rel='noopener noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='fill-current'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                    </svg>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <Layout>{children}</Layout>
          <footer className='footer fixed bottom-0 z-50 flex flex-row items-center justify-between border-2 border-base-100/50 bg-base-100 p-1 text-xs text-neutral-content sm:gap-y-0'>
            <div className=''>
              <p>© Copyright {new Date().getFullYear()} Alejandro Oviedo</p>
            </div>
            <div className='hidden gap-4 sm:block'>
              <p>Powerd by Next.js & React Three Fiber</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
