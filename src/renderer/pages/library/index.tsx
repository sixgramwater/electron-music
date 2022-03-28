import React from 'react';
import styles from './index.module.scss';
import { Carousel, Row, Col } from 'antd';
import { useQuery } from 'react-query';
import { fetchBanner, fetchToplistDetail } from 'renderer/api';
import BannerItem from 'renderer/components/Banner';
import { group } from 'renderer/utils';
import { Tabs, TabItem } from '../../components/Tabs/TabNav';
import RanklistItem from 'renderer/components/RanklistItem';
import Scroll from 'renderer/components/scrollbar';
import LibHome from './libHome';


const Library: React.FC = () => {
  const bannerResult = useQuery('banner', () => fetchBanner(), {
    staleTime: Infinity
  });
  const ranklistResult = useQuery('ranklist', () => fetchToplistDetail(), {
    staleTime: Infinity
  });
  const ranklistData = ranklistResult.data?.list.map((item: any) => {
    return {
      tracks: item.tracks,
      name: item.name,
      id: item.id,
      picUrl: item.coverImgUrl,
      playCount: item.playCount,
    }
  })

  const bannerData = bannerResult.data?.banners;
  const mappedBanners = bannerData?.map((item: any) => {
    return {
      imgUrl: item.imageUrl,
    }
  });

  const groupedBanners = group(mappedBanners);
  // const homePageResource =
  // console.log(groupedBanners);


  return (
    <Scroll>
    <div className={styles.pageLibrary}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitle}>
          <h1>音乐库</h1>
        </div>
        <div className={styles.TabContainer}>
          <Tabs defaultActiveKey='hot'>
            <TabItem
              key="hot"
              tab='精选'
            >
              <div className={styles.carouselContainer}>
                <Carousel
                  autoplay={true}
                >
                  {
                    groupedBanners?.map((item: any, index) => (
                      <div className={styles.bannerContainer} key={index}>
                        <BannerItem
                        imgUrl={item[0].imgUrl}
                        />
                        <BannerItem
                          imgUrl={item[1].imgUrl}
                        />
                      </div>

                    ))
                  }
                </Carousel>
              </div>
              <div className={styles.content}>
                <LibHome />
              </div>
            </TabItem>
            <TabItem
              key="ranklist"
              tab='排行'
            >
              {/* <div className={styles.ranklistContainer}> */}
              <Row
                gutter={[16, 24]}
              >
                {
                  ranklistData?.map((item: any) => (
                    <Col
                      xs={12}
                      xl={8}
                      className={styles.ranklistItemContainer}
                    >
                      <RanklistItem
                        {...item}
                      />
                    </Col>

                  ))
                }
              </Row>
              {/* </div> */}
            </TabItem>
          </Tabs>
        </div>


      </div>
    </div>
    </Scroll>
  )
};

export default Library;


