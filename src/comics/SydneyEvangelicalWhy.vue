<script setup lang="ts">
import BeanieMan from '../vue-comic-components/svgs/BeanieMan.vue';
import PanelBox from '../vue-comic-components/components/PanelBox.vue';
import ComicBox from '../vue-comic-components/components/ComicBox.vue';
import AfterComicBox from '../vue-comic-components/components/AfterComicBox.vue';
import ComicTitle from '../vue-comic-components/components/ComicTitle.vue';
import NavigationBar from '../vue-comic-components/components/NavigationBar.vue';
import { availableLimbPositions } from "../vue-comic-components/constants/limbPositions";
import { toRefs } from "vue";
const props = defineProps<{
  comicList: Array<string>;
}>();
const { comicList } = toRefs(props);
</script>

<template>
  <ComicTitle>Sydney Evangelicals: Why</ComicTitle>
  <NavigationBar :comicList="comicList" />
  <ComicBox>
    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.handsFolded" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <text x="170" y="100">TWO CAMPS HERE, BROADLY.</text>
      <text x="170" y="140">1. PRESUPPOSITIONAL</text>
      <text x="170" y="180">2. EVIDENTIALIST</text>
    </PanelBox>

  </ComicBox>
  <NavigationBar :comicList="comicList" />
  <AfterComicBox>
    <p>Join the discussion at <a
        href="https://www.reddit.com/r/mitt_comics/comments/wxv4ah/comic_3_sydney_evangelicals_why/">Reddit</a>.</p>
  </AfterComicBox>
</template>
