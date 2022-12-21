<script lang="ts">
import { Languages, type Locations } from '@/types';
import { locationInfos } from '@/constants';
import { gameState } from '@/gameState';
import { defineComponent } from 'vue';
import TranslatableText from '@/components/TranslatableText.vue';

export default defineComponent({
    props: {
        selectedLocation: String,
    },

    data(props) {
        return {
            selectedLocationInfo: locationInfos[props.selectedLocation as Locations], Languages, chessResults: gameState.locationChessResults[props.selectedLocation as Locations]
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
            <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                :text="selectedLocationInfo?.nameFrench" />
        </h2>
        <div class="infoBoxInfo">
            <div class="infoBoxSubitle"><i>
                    <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                        :text="selectedLocationInfo?.subtitleFrench" />
                </i></div>
            <div class="infoBoxDescription">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    :text="selectedLocationInfo?.descriptionFrench" />
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Coordonnées de la ville" />: ({{
                            selectedLocationInfo?.cityCoordinates.latitude
                    }},
                {{ selectedLocationInfo?.cityCoordinates.longitude }})
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Taille de la ville" />: {{ selectedLocationInfo?.cityHectares }}ha
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Taille du district" />: {{ selectedLocationInfo?.districtHectares }}ha
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Influence de la zone" />: {{ selectedLocationInfo?.influenceAvailable
                    }}
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Victoires" />: {{ chessResults?.wins
                    }}
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Égalités" />: {{ chessResults?.ties
                    }}
            </div>
            <div class="infoBoxNumericInfo">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Défaites" />: {{ chessResults?.losses
                    }}
            </div>
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