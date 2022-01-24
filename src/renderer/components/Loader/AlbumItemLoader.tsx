import React from 'react';
import ContentLoader from 'react-content-loader';

const AlbumItemLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={750}
      height={700}
      viewBox="0 0 750 700"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      // {...props}
    >
      <rect x="14" y="274" rx="2" ry="2" width="140" height="13" />
      <rect x="10" y="88" rx="0" ry="0" width="172" height="169" />
      <rect x="203" y="89" rx="0" ry="0" width="172" height="169" />
      <rect x="206" y="275" rx="2" ry="2" width="140" height="13" />
      <rect x="398" y="88" rx="0" ry="0" width="172" height="169" />
      <rect x="401" y="274" rx="2" ry="2" width="140" height="13" />
      <rect x="2" y="409" rx="0" ry="0" width="172" height="169" />
      <rect x="2" y="595" rx="2" ry="2" width="140" height="13" />
      <rect x="199" y="410" rx="0" ry="0" width="172" height="169" />
      <rect x="5" y="341" rx="2" ry="2" width="252" height="23" />
      <rect x="199" y="591" rx="2" ry="2" width="140" height="13" />
      <rect x="392" y="408" rx="0" ry="0" width="172" height="169" />
      <rect x="395" y="592" rx="2" ry="2" width="140" height="13" />
      <rect x="7" y="29" rx="2" ry="2" width="252" height="23" />
      <rect x="591" y="87" rx="0" ry="0" width="172" height="169" />
      <rect x="592" y="273" rx="2" ry="2" width="140" height="13" />
      <rect x="586" y="406" rx="0" ry="0" width="172" height="169" />
      <rect x="587" y="593" rx="2" ry="2" width="140" height="13" />
    </ContentLoader>
  );
};

export default AlbumItemLoader;
