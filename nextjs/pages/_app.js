import Head from 'next/head';
import CodeEditor from '../components/CodeEditor';
import Shell from '../components/Shell';

function CodeFast({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>CodeFast AI Software Developer</title>
      </Head>
      <CodeEditor />
      <Shell />
      <Component {...pageProps} />
    </div>
  );
}

export default CodeFast;