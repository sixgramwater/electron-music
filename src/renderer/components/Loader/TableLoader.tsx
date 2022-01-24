import ContentLoader from 'react-content-loader';

const TableLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={560}
      viewBox="0 0 500 560"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="5" y="60" rx="0" ry="0" width="558" height="33" />
      <rect x="-1" y="137" rx="0" ry="0" width="558" height="33" />
      <rect x="-4" y="214" rx="0" ry="0" width="558" height="33" />
      <rect x="3" y="290" rx="0" ry="0" width="558" height="33" />
      <rect x="0" y="365" rx="0" ry="0" width="558" height="33" />
      <rect x="7" y="435" rx="0" ry="0" width="558" height="33" />
    </ContentLoader>
  );
};

export default TableLoader;
