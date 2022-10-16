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
  <ComicTitle>Many Meetings</ComicTitle>
  <NavigationBar :comicList="comicList" />
  <ComicBox>
    <PanelBox>
      <BeanieMan :minimumX="70" :minimumY="50" :limbPositions="availableLimbPositions.leftHandWave" />
      <text x="185" y="100">HEY THERE!</text>
      <text x="185" y="140">IF YOU'RE WONDERING</text>
      <text x="185" y="180">WHO THE STRANGE,</text>
      <text x="185" y="220">BEANIE-WEARING</text>
      <text x="185" y="260">STICK FIGURE IS,</text>
      <text x="185" y="300">I'M MIDLY.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="50" :minimumY="50" :limbPositions="availableLimbPositions.rightHandPointUp" />
      <text x="185" y="100">IF YOU'RE WONDERING</text>
      <text x="185" y="140">WHAT "MITT" IS, THAT</text>
      <text x="185" y="180">WOULD BE "MIDLY'S</text>
      <text x="185" y="220">IDEOLOGICAL TURING</text>
      <text x="185" y="260">TEST".</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="50" :minimumY="50" :limbPositions="availableLimbPositions.handsDown" />
      <text x="185" y="100">AN "IDEOLOGY" IS A</text>
      <text x="185" y="140">BUNCH OF IDEAS</text>
      <text x="185" y="180">SOMEONE BELIEVES.</text>
      <text x="185" y="220"></text>
      <text x="185" y="260">THE IDEA OF THE</text>
      <text x="185" y="300">TURING TEST IS TO</text>
      <text x="185" y="340">EXPLAIN THOSE IDEAS</text>
      <text x="185" y="380">AS IF YOU BELIEVE</text>
      <text x="185" y="420">THEM.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="70" :minimumY="50" :limbPositions="availableLimbPositions.shrug" />
      <text x="205" y="100">OF COURSE, JUST</text>
      <text x="205" y="140">LIKE A CHATBOT</text>
      <text x="205" y="180">TRYING TO PASS</text>
      <text x="205" y="220">THE REAL TURING</text>
      <text x="205" y="260">TEST, I'M BOUND TO</text>
      <text x="205" y="300">HAVE GAPS AND</text>
      <text x="205" y="340">GAFFS AT FIRST.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="70" :minimumY="50" :limbPositions="availableLimbPositions.excited" />
      <text x="205" y="100">TO THAT END,</text>
      <text x="205" y="140">FEEDBACK IS VERY</text>
      <text x="205" y="180">WELCOME! COMICS WILL</text>
      <text x="205" y="220">COME WITH A LINK</text>
      <text x="205" y="260">TO A DISCUSSION</text>
      <text x="205" y="300">THREAD, WHERE ANY</text>
      <text x="205" y="340">COMMENTS ARE</text>
      <text x="205" y="380">APPRECIATED.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="70" :minimumY="50" :limbPositions="availableLimbPositions.handsDown" />
      <text x="205" y="100">ALSO, IF I MAKE ANY</text>
      <text x="205" y="140">CHANGES TO THE</text>
      <text x="205" y="180">COMICS IN LIGHT OF</text>
      <text x="205" y="220">FEEDBACK, YOU'LL</text>
      <text x="205" y="260">BE ABLE TO SEE</text>
      <text x="205" y="300">THE EDIT HISTORY</text>
      <text x="205" y="340">ON GITHUB.</text>
    </PanelBox>

    <PanelBox>
      <BeanieMan :minimumX="55" :minimumY="160" :lengthX="75" :lengthY="300"
        :limbPositions="availableLimbPositions.rightHandWave" />
      <text x="170" y="100">WITH THAT, ENJOY! I'M</text>
      <text x="170" y="140">A BIG FAN OF GETTING</text>
      <text x="170" y="180">DIFFERENT SIDES TO</text>
      <text x="170" y="220">UNDERSTAND EACH</text>
      <text x="170" y="260">OTHER BETTER - </text>
      <text x="170" y="300">I'M HOPING THIS COMIC'LL</text>
      <text x="170" y="340">HELP ME TO DO THAT,</text>
      <text x="170" y="380">AND MAYBE HELP</text>
      <text x="170" y="420">SOME READERS TOO.</text>
    </PanelBox>
  </ComicBox>
  <NavigationBar :comicList="comicList" />
  <AfterComicBox>
    <p>Hey hey, welcome to the first post-comic text! I'll stick any necessary explanations or useful links here, as
      well as a note if I've edited the comic. I'll also leave a link to a discussion thread. In this case:</p>
    <p>Join the discussion at <a
        href="https://www.reddit.com/r/mitt_comics/comments/wxv4ah/comic_1_many_meetings/">Reddit</a>.</p>
  </AfterComicBox>
</template>
