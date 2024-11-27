import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Features from "@layouts/partials/Features";
import News from "@layouts/partials/News";
import HomeBanner from "@layouts/partials/HomeBanner";
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
      <HomeBanner banner={banner} brands={brands} />
      <Features features={features} />
      <News news={news} />
      <ShortIntro intro={intro} />
      <SpecialFeatures speciality={speciality} />
    </GSAPWrapper>
  );
};

export default Home;
