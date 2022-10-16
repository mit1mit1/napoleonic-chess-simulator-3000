<script setup lang="ts">
import BeanieMan from '../vue-comic-components/svgs/BeanieMan.vue';
import PanelBox from '../vue-comic-components/components/PanelBox.vue';
import ComicBox from '../vue-comic-components/components/ComicBox.vue';
import AfterComicBox from '../vue-comic-components/components/AfterComicBox.vue';
import ComicTitle from '../vue-comic-components/components/ComicTitle.vue';
import NavigationBar from '../vue-comic-components/components/NavigationBar.vue';
import BibleFigure from '../vue-comic-components/svgs/BibleFigure.vue';
import ManFigure from '../vue-comic-components/svgs/ManFigure.vue';
import { availableLimbPositions } from '../vue-comic-components/constants/limbPositions';
import { toRefs } from "vue";
const props = defineProps<{
  comicList: Array<string>;
}>();
const { comicList } = toRefs(props);
</script>

<template>
  <ComicTitle>Sydney Evangelicals: What</ComicTitle>
  <NavigationBar :comicList="comicList" />
  <ComicBox>
    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.handsFolded" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <text x="170" y="100">IF I HAD TO SUMMARIZE</text>
      <text x="170" y="140">THE EVANGELICAL</text>
      <text x="170" y="180">WORLDVIEW, I'D GIVE</text>
      <text x="170" y="220">THREE POINTS.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandPointUp" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <text x="170" y="100">1. WHAT IS THE BIBLE?</text>
      <text x="170" y="140">2. WHO ARE PEOPLE?</text>
      <text x="170" y="180">3. WHO IS JESUS?</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandHoldingMid" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <BibleFigure :minimumX="153" :minimumY="287" :rotation="10" />
      <text x="60" y="100">1. WHAT IS THE BIBLE?</text>
      <text x="170" y="140"></text>
      <text x="170" y="180">THE TRUE AND</text>
      <text x="170" y="220">AUTHORITATIVE WORD</text>
      <text x="170" y="260">OF GOD.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandHoldingDown" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <BibleFigure :minimumX="158" :minimumY="327" :rotation="45" />
      <text x="120" y="100">WE KNOW THAT THE BIBLE</text>
      <text x="145" y="140">WAS WRITTEN BY MANY</text>
      <text x="170" y="180">HUMAN AUTHORS, IN</text>
      <text x="170" y="220">VARIOUS GENRES, FOR</text>
      <text x="170" y="260">SPECIFIC READERS.</text>
      <text x="170" y="300"></text>
      <text x="235" y="340">BUT WE ALSO</text>
      <text x="235" y="380">KNOW GOD USED</text>
      <text x="235" y="420">THOSE AUTHORS</text>
      <text x="235" y="460">TO SPEAK TRUTH.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandHoldingMid" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <BibleFigure :minimumX="153" :minimumY="287" :rotation="10" />
      <text x="120" y="100">TO UNDERSTAND WHAT</text>
      <text x="145" y="140">THE BIBLE SAYS, WE</text>
      <text x="165" y="180">NEED TO CONSIDER</text>
      <text x="165" y="220">CONTEXT, GENRE, AND</text>
      <text x="165" y="260">THE ORIGINAL READERS.</text>
      <text x="165" y="300"></text>
      <text x="235" y="340">BUT ONCE WE</text>
      <text x="235" y="380">HAVE DONE THIS,</text>
      <text x="235" y="420">WE TAKE WHAT IT</text>
      <text x="235" y="460">SAYS AS TRUTH.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandHoldingDown" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <BibleFigure :minimumX="158" :minimumY="327" :rotation="45" />
      <text x="120" y="100">THAT'S A BIT VAGUE STILL,</text>
      <text x="145" y="140">BUT I HOPE THAT IT WILL</text>
      <text x="165" y="180">BE A BIT MORE CLEAR</text>
      <text x="165" y="220">AFTER I GO THROUGH</text>
      <text x="165" y="260">THE OTHER TWO</text>
      <text x="165" y="300">POINTS.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandPointingSouthEast" beanieBaseColor="#44d"
        beanieStripeColor="#bbb" />
      <text x="60" y="100">2. WHO ARE PEOPLE?</text>
      <text x="170" y="140"></text>
      <text x="170" y="180">GOD'S BEAUTIFUL</text>
      <text x="170" y="220">CREATION, WHO ARE</text>
      <text x="170" y="260">ENSTRANGED FROM</text>
      <text x="230" y="300">THEIR CREATOR.</text>
      <BeanieMan :minimumX="260" :minimumY="330" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" beanieBaseColor="#afd" beanieStripeColor="#aad" />
      <ManFigure :minimumX="300" :minimumY="340" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" />
      <BeanieMan :minimumX="340" :minimumY="340" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" beanieBaseColor="#ee0" beanieStripeColor="#eef" />
      <BeanieMan :minimumX="380" :minimumY="310" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" beanieBaseColor="#fa3" beanieStripeColor="#3af" />
      <ManFigure :minimumX="420" :minimumY="370" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" />
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="60" :minimumY="110" :lengthX="90" :lengthY="360"
        :limbPositions="availableLimbPositions.rightHandHoldingMid" beanieBaseColor="#44d" beanieStripeColor="#bbb" />
      <text x="60" y="100">PEEPS MADE BY GOD GENESIS</text>
      <text x="170" y="140"></text>
      <text x="170" y="180">GOD'S BEAUTIFUL</text>
      <text x="170" y="220">CREATION, WHO ARE</text>
      <text x="170" y="260">ENSTRANGED FROM</text>
      <text x="230" y="300">THEIR CREATOR.</text>
      <BeanieMan :minimumX="260" :minimumY="330" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" beanieBaseColor="#afd" beanieStripeColor="#aad" />
      <ManFigure :minimumX="300" :minimumY="340" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" />
      <BeanieMan :minimumX="340" :minimumY="340" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" beanieBaseColor="#ee0" beanieStripeColor="#eef" />
      <BeanieMan :minimumX="380" :minimumY="310" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" beanieBaseColor="#fa3" beanieStripeColor="#3af" />
      <ManFigure :minimumX="420" :minimumY="370" :lengthX="30" :lengthY="120"
        :limbPositions="availableLimbPositions.handsDown" />
    </PanelBox>
  </ComicBox>
  <NavigationBar :comicList="comicList" />
  <AfterComicBox>
    <p>Join the discussion at <a
        href="https://www.reddit.com/r/mitt_comics/comments/wxv4ah/comic_2_sydney_evangelicals_what/">Reddit</a>.</p>
  </AfterComicBox>
</template>
