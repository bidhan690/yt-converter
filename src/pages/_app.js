import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>Free Online MP3 Converter - Convert Audio Files to MP3</title>
    <meta name='description' content='Convert your audio files to high-quality MP3s for free with our easy-to-use online converter. No software installation or registration required!' />
    <meta name="author" content="Bidhan Niroula" />
    <link rel='icon' href='/pp.png' />
     </Head>
  <Component {...pageProps} />
  <Analytics />
 </>
}
