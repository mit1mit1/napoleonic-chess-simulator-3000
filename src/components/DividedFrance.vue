<script lang="ts">
import { Locations } from '@/types';
import { locationInfos } from '@/constants';
import ParisDistrict from '@/vue-svgs/france/ParisDistrict.vue';
import AimensDistrict from '@/vue-svgs/france/AimensDistrict.vue';
import RennesDistrictWest from '@/vue-svgs/france/RennesDistrictWest.vue';
import RennesDistrictEast from '@/vue-svgs/france/RennesDistrictEast.vue';
import OrleansDistrict from '@/vue-svgs/france/OrleansDistrict.vue';
import PotiersDistrict from '@/vue-svgs/france/PotiersDistrict.vue';
import LyonDistrict from '@/vue-svgs/france/LyonDistrict.vue';
import DijonDistrict from '@/vue-svgs/france/DijonDistrict.vue';
import ReimsDistrict from '@/vue-svgs/france/ReimsDistrict.vue';
import BordeauxDistrict from '@/vue-svgs/france/BordeauxDistrict.vue';
import TolouseDistrict from '@/vue-svgs/france/TolouseDistrict.vue';
import MarsielleDistrict from '@/vue-svgs/france/MarsielleDistrict.vue';
import ValenceDistrict from '@/vue-svgs/france/ValenceDistrict.vue';
import { defineComponent } from 'vue';
import TranslatableText from '@/components/TranslatableText.vue';
import LocationInfo from './LocationInfo.vue';


let startedGame = false;
let selectedLocation = Locations.None;
export default defineComponent({
    props: {
        onAttackLocation: Function,
    },

    data() {
        return {
            startedGame, Locations, selectedLocation, selectedLocationColor: '#aaa', selectedLocationInfo: locationInfos[selectedLocation]
        }
    },

    methods: {
        handleLocationClick(clickedLocation: Locations) {
            this.startedGame = true;
            this.selectedLocation = (clickedLocation === this.selectedLocation) ? Locations.None : clickedLocation;
            this.selectedLocationInfo = locationInfos[this.selectedLocation];
        },
        handleDistrictAttack(clickedLocation: Locations) {
            alert('Attacking ' + locationInfos[clickedLocation]?.name);
            this.onAttackLocation && this.onAttackLocation(clickedLocation);
        }
    },

    components: {
    ParisDistrict,
    AimensDistrict,
    RennesDistrictWest,
    RennesDistrictEast,
    PotiersDistrict,
    OrleansDistrict,
    LyonDistrict,
    DijonDistrict,
    ReimsDistrict,
    BordeauxDistrict,
    TolouseDistrict,
    MarsielleDistrict,
    ValenceDistrict,
    TranslatableText,
    LocationInfo
}
});
</script>

<template>
    <div class="mapScreen">
        <div class="locationInfoBox">
            <div v-for="location in Locations">
                <LocationInfo v-if="location === selectedLocation" :selected-location="location"/>
            </div>
            <button class="napoleonic-button infoBoxButton"
                :onclick="() => handleDistrictAttack(selectedLocation)">Attack</button>
            
        </div>
        <div class="mapSVGBox">
            <svg height="450" width="400">
                <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="scale(2,2)">

                    <g class="clickable" :onclick="() => handleLocationClick(Locations.ParisDistrict)"
                        :fill="selectedLocation === Locations.ParisDistrict ? selectedLocationColor : 'orange'">
                        <ParisDistrict />
                    </g>
                    <g class="clickable" :onclick="() => handleLocationClick(Locations.AimensDistrict)"
                        :fill="selectedLocation === Locations.AimensDistrict ? selectedLocationColor : '#a00'">
                        <AimensDistrict />
                    </g>
                    <g class="clickable" :onclick="() => handleLocationClick(Locations.RennesDistrictWest)"
                        :fill="selectedLocation === Locations.RennesDistrictWest ? selectedLocationColor : '#0b0'">
                        <RennesDistrictWest />
                    </g>
                    <g class="clickable" :onclick="() => handleLocationClick(Locations.RennesDistrictEast)"
                        :fill="selectedLocation === Locations.RennesDistrictEast ? selectedLocationColor : '#0b0'">
                        <RennesDistrictEast />
                    </g>

                    <g class="clickable" :onclick="() => handleLocationClick(Locations.PotiersDistrict)"
                        :fill="selectedLocation === Locations.PotiersDistrict ? selectedLocationColor : '#00c'">
                        <PotiersDistrict />
                    </g>

                    <g class="clickable" :onclick="() => handleLocationClick(Locations.OrleansDistrict)"
                        :fill="selectedLocation === Locations.OrleansDistrict ? selectedLocationColor : '#a0a'">
                        <OrleansDistrict />
                    </g>


                    <g class="clickable" :onclick="() => handleLocationClick(Locations.BordeauxDistrict)"
                        :fill="selectedLocation === Locations.BordeauxDistrict ? selectedLocationColor : '#aa0'">
                        <BordeauxDistrict />
                    </g>

                    <g class="clickable" :onclick="() => handleLocationClick(Locations.TolouseDistrict)"
                        :fill="selectedLocation === Locations.TolouseDistrict ? selectedLocationColor : '#0aa'">
                        <TolouseDistrict />
                    </g>

                    <g class="clickable" :onclick="() => handleLocationClick(Locations.MarsielleDistrict)"
                        :fill="selectedLocation === Locations.MarsielleDistrict ? selectedLocationColor : '#fac'">
                        <MarsielleDistrict />
                    </g>


                    <g class="clickable" :onclick="() => handleLocationClick(Locations.ValenceDistrict)"
                        :fill="selectedLocation === Locations.ValenceDistrict ? selectedLocationColor : '#baf'">
                        <ValenceDistrict />
                    </g>


                    <g class="clickable" :onclick="() => handleLocationClick(Locations.LyonDistrict)"
                        :fill="selectedLocation === Locations.LyonDistrict ? selectedLocationColor : '#7d7'">
                        <LyonDistrict />
                    </g>


                    <g class="clickable" :onclick="() => handleLocationClick(Locations.DijonDistrict)"
                        :fill="selectedLocation === Locations.DijonDistrict ? selectedLocationColor : '#bc0'">
                        <DijonDistrict />
                    </g>



                    <g class="clickable" :onclick="() => handleLocationClick(Locations.ReimsDistrict)"
                        :fill="selectedLocation === Locations.ReimsDistrict ? selectedLocationColor : '#a0f'">
                        <ReimsDistrict />
                    </g>

                </g>
            </svg>
        </div>
    </div>
</template>

<style>
.clickable {
    cursor: pointer;
}

.infoBoxInfo {
    margin-bottom: 20px;
    font-family: 'Quicksand';
}

.mapScreen {
    height: 480px;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
}

.infoBoxButton {
    position: absolute;
    bottom: 20px;
}

.locationInfoBox {
    display: inline-block;
    position: relative;
    width: 300px;
    vertical-align: top;
    background-color: #def;
    padding: 15px;
    min-height: 480px;
}

.mapSVGBox {
    height: 480px;
    display: inline-block;
}

.infoBoxTitle {
    margin: 0 0 5px 0;
    text-align: left;
}

.infoBoxSubitle {
    margin: 0 0 15px 0;
    text-align: left;
}

.infoBoxDescription {
    margin: 0 0 15px 0;
}


.infoBoxNumericInfo {
    margin: 0 0 5px 0;
}
</style>