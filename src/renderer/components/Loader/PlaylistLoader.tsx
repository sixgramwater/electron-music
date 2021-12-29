import ContentLoader from "react-content-loader"

const PlaylistLoader = () => {
  return (
    <ContentLoader
    speed={2}
    width={700}
    height={700}
    viewBox="0 0 700 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <rect x="4" y="63" rx="0" ry="0" width="190" height="193" />
    <rect x="241" y="62" rx="0" ry="0" width="362" height="44" />
    <circle cx="261" cy="149" r="15" />
    <rect x="301" y="138" rx="0" ry="0" width="219" height="18" />
    <rect x="246" y="177" rx="0" ry="0" width="226" height="35" />
    <rect x="248" y="226" rx="0" ry="0" width="91" height="30" />
    <rect x="15" y="336" rx="0" ry="0" width="593" height="25" />
    <rect x="15" y="383" rx="0" ry="0" width="593" height="25" />
    <rect x="16" y="438" rx="0" ry="0" width="593" height="25" />
    <rect x="14" y="485" rx="0" ry="0" width="593" height="25" />
    <rect x="13" y="537" rx="0" ry="0" width="593" height="25" />
    <rect x="14" y="586" rx="0" ry="0" width="593" height="25" />
    <rect x="13" y="633" rx="0" ry="0" width="593" height="25" />
  </ContentLoader>
  )
}

export default PlaylistLoader;
