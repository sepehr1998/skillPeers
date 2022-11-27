<template>
    <div class="container">
        <img src="@/assets/stop.png" alt="stop" style="max-height: 100px; margin-top: 2rem; margin-bottom: 2rem;"/>
      <div>
        <p class="phrase text-center">Privacy Warning</p>
      </div>
      <div style="border-color: white; border-radius: 10px; border-width: 2px; border-style: dashed; padding: 1rem; margin-bottom: 1rem">
      <p class="phrase_2 text-center">Members are to communicate with each other and arrange for financial transaction, Some tips:
      </p>
      <p class="phrase_2 text-center">1-For example some vendors found buyers appreciate half to one hour free service at the beginning.
      </p>
      <p class="phrase_3 text-center">2-Examples of Financial platforms include: PAYPAL, WISE, VENMO and ZELLE.</p>
      </div>
    </div>
</template>
<script>
    export default {
        name: "UnderConstruction",
    };
</script>
<style lang="scss" scoped>
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }


    $white: #FBF5F3;
    $black: #5f4dee;

    .container {
        height: inherit !important;
        width: inherit !important;
        background-color: $black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 0.4375rem;
        border: 1px solid white;
    }

    .phrase {
        /*margin-top: 1em;*/
        margin-bottom: 1em;
        font-size: 1.5rem;
        color: $white;
    }
    .phrase_2 {
        /*margin-top: 1em;*/
        margin-bottom: 1em;
        font-size: 1rem;
        color: $white;
    }
    .phrase_3 {
      /*margin-top: 1em;*/
      font-size: 1rem;
      color: $white;
    }

    #house {
        animation: houseAnimation 2.5s ease-in-out infinite alternate;
    }

    @keyframes houseAnimation {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-12px);
        }
    }

    @media only screen and (max-width: 768px) {
        .underconstruction-svg{
            transform: scale(0.75);
        }
    }


</style>