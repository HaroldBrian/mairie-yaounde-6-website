import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import News from "@layouts/partials/News";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeBanner2 from "@layouts/partials/HomeBanner2";
import SeoMeta from "@layouts/partials/SeoMeta";
import ShortIntro from "@layouts/partials/ShortIntro";
import SpecialFeatures from "@layouts/partials/SpecialFeatures";
import { getListPage } from "@lib/contentParser";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, brands, features, news, intro, speciality } = frontmatter;
  return (
    <GSAPWrapper>
      <SeoMeta title="Votre mairie" />
      {/* <HomeBanner2 banner={banner} brands={brands} /> */}
      <HomeBanner banner={banner} brands={brands} />
      <News news={news} />
      <Features features={features} />
      <ShortIntro intro={intro} />
      <SpecialFeatures speciality={speciality} />
    </GSAPWrapper>
  );
};

export default Home;
