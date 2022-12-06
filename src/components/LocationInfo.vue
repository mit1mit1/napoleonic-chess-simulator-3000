<script lang="ts">
import type { Locations } from '@/types';
import { locationInfos } from '@/constants';
import { defineComponent } from 'vue';
import TranslatableText from '@/components/TranslatableText.vue';

export default defineComponent({
    props: {
        selectedLocation: String,
        setTranslatedWord: Function,
    },

    data(props) {
        return {
            selectedLocationInfo: locationInfos[props.selectedLocation as Locations]
        }
    },

    components: {
        TranslatableText,
    }
});
</script>

<template>
    <div v-if="selectedLocationInfo !== undefined">
        <h2 class="infoBoxTitle">
            <TranslatableText :setTranslatedWord="setTranslatedWord" from-language="en" to-language="fr"
                :text="selectedLocationInfo?.name" />
        </h2>
        <div class="infoBoxInfo">
            <div class="infoBoxSubitle"><i>
                    <TranslatableText :setTranslatedWord="setTranslatedWord" from-language="en" to-language="fr"
                        :text="selectedLocationInfo?.subtitleEnglish" />
                </i></div>
            <div class="infoBoxDescription">
                <TranslatableText :setTranslatedWord="setTranslatedWord" from-language="en" to-language="fr"
                    :text="selectedLocationInfo?.descriptionEnglish" />
            </div>
            <div class="infoBoxNumericInfo">City Co-ordinates: ({{
                    selectedLocationInfo?.cityCoordinates.latitude
            }},
                {{ selectedLocationInfo?.cityCoordinates.longitude }})</div>
            <div class="infoBoxNumericInfo">City Size: {{ selectedLocationInfo?.cityHectares }}ha</div>
            <div class="infoBoxNumericInfo">District Size: {{ selectedLocationInfo?.districtHectares }}ha
            </div>
            <div class="infoBoxNumericInfo">Area Influence: {{ selectedLocationInfo?.influenceAvailable
            }}</div>
        </div>
    </div>
</template>

<style>
.infoBoxInfo {
    margin-bottom: 20px;
    font-family: 'Quicksand';
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