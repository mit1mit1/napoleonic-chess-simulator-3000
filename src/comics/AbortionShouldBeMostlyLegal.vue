<script setup>
import BeanieMan from '../svgs/BeanieMan.vue';
import Panel from '../components/Panel.vue';
import ComicBox from '../components/ComicBox.vue';
import AfterComicBox from '../components/AfterComicBox.vue';
import ComicTitle from '../components/ComicTitle.vue';
import NavigationBar from '../components/NavigationBar.vue';
import { availableLimbPositions } from '../limbPositions';
</script>

<template>
  <ComicTitle>Abortion Should Be Mostly Legal</ComicTitle>
  <NavigationBar />
  <ComicBox>
    <Panel>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.handsFolded" beanieColor="#44d" beanieStripeColor="#bbb" />
      <text x="170" y="100">FOR THE SAKE OF WOMEN'S</text>
      <text x="170" y="140">WELLBEING AND ALSO AS</text>
      <text x="170" y="180">LACK OF DIFFERENCE</text>
      <text x="170" y="220">ILLEGALIZING MAKES.</text>
    </Panel>
  </ComicBox>
  <NavigationBar />
  <AfterComicBox>
    <p>Join the discussion at <a
        href="https://www.reddit.com/r/mitt_comics/comments/wxv4ah/comic_2_sydney_evangelicals_what/">Reddit</a>.</p>
  </AfterComicBox>
</template>
