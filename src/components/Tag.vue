<template>
    <button :class="icon != null ? 'icon ' + icon : 'standard'" @click="e => select(e)">{{ tag }}</button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { randomizeTagColor } from '@/composables/functions';

  export default defineComponent({
    props: {
        tag: {
            type: String,
            required: true
        },
        icon: {
          type: String,
          required: false
        }
    },
    setup() {

        function select(e: MouseEvent) {

            if (e) {

              const target = e.target as HTMLButtonElement;
              const tagColor = randomizeTagColor(target.textContent ?? '');

              if (target.classList.contains('selected')) {

                target.classList.remove('selected');
                target.classList.remove(tagColor);

              } else {

                target.classList.add('selected');
                target.classList.add(tagColor);

              }
            }

        }

        return {
            randomizeTagColor,
            select
        }

    }
   
  })
</script>

<style scoped>

button {
    font-family: 'Lexend Deca', sans-serif;
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    background-color: transparent;
    color: white;
    outline: 1px solid white;
    border: none;
    cursor: pointer;
}

.xbox::before {
  content:"\0000a0";
  display:inline-flex;
  height:1rem;
  width:1rem;
  line-height:1rem;
  margin:0px 10px 0px 0px;
  position:relative;
  top:0px;
  left:0px;
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0ieGJveC1pY29uIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImZpbGw6IHdoaXRlOyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzY5LjkgMzE4LjJjNDQuMyA1NC4zIDY0LjcgOTguOCA1NC40IDExOC43LTcuOSAxNS4xLTU2LjcgNDQuNi05Mi42IDU1LjktMjkuNiA5LjMtNjguNCAxMy4zLTEwMC40IDEwLjItMzguMi0zLjctNzYuOS0xNy40LTExMC4xLTM5QzkzLjMgNDQ1LjggODcgNDM4LjMgODcgNDIzLjRjMC0yOS45IDMyLjktODIuMyA4OS4yLTE0Mi4xIDMyLTMzLjkgNzYuNS03My43IDgxLjQtNzIuNiA5LjQgMi4xIDg0LjMgNzUuMSAxMTIuMyAxMDkuNXpNMTg4LjYgMTQzLjhjLTI5LjctMjYuOS01OC4xLTUzLjktODYuNC02My40LTE1LjItNS4xLTE2LjMtNC44LTI4LjcgOC4xLTI5LjIgMzAuNC01My41IDc5LjctNjAuMyAxMjIuNC01LjQgMzQuMi02LjEgNDMuOC00LjIgNjAuNSA1LjYgNTAuNSAxNy4zIDg1LjQgNDAuNSAxMjAuOSA5LjUgMTQuNiAxMi4xIDE3LjMgOS4zIDkuOS00LjItMTEtLjMtMzcuNSA5LjUtNjQgMTQuMy0zOSA1My45LTExMi45IDEyMC4zLTE5NC40em0zMTEuNiA2My41QzQ4My4zIDEyNy4zIDQzMi43IDc3IDQyNS42IDc3Yy03LjMgMC0yNC4yIDYuNS0zNiAxMy45LTIzLjMgMTQuNS00MSAzMS40LTY0LjMgNTIuOEMzNjcuNyAxOTcgNDI3LjUgMjgzLjEgNDQ4LjIgMzQ2YzYuOCAyMC43IDkuNyA0MS4xIDcuNCA1Mi4zLTEuNyA4LjUtMS43IDguNSAxLjQgNC42IDYuMS03LjcgMTkuOS0zMS4zIDI1LjQtNDMuNSA3LjQtMTYuMiAxNS00MC4yIDE4LjYtNTguNyA0LjMtMjIuNSAzLjktNzAuOC0uOC05My40ek0xNDEuMyA0M0MxODkgNDAuNSAyNTEgNzcuNSAyNTUuNiA3OC40Yy43LjEgMTAuNC00LjIgMjEuNi05LjcgNjMuOS0zMS4xIDk0LTI1LjggMTA3LjQtMjUuMi02My45LTM5LjMtMTUyLjctNTAtMjMzLjktMTEuNy0yMy40IDExLjEtMjQgMTEuOS05LjQgMTEuMnoiLz48L3N2Zz4=) no-repeat left center transparent;
  background-size:100% 100%;
}

.pc::before {
  content:"\0000a0";
  display:inline-flex;
  height:1rem;
  width:1rem;
  line-height:1rem;
  margin:0px 10px 0px 0px;
  position:relative;
  top:0px;
  left:0px;
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0icGMtaWNvbiIgc3R5bGU9ImZpbGw6IHdoaXRlOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgOC40NjY2NjY1IDguNDY2NjY2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZGF0YS12LTMwOTMzMTUyPSIiPjxkZWZzIGlkPSJkZWZzMiIgZGF0YS12LTMwOTMzMTUyPSIiPjwvZGVmcz48ZyBpZD0ibGF5ZXIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yODguNTMzMzIpIiBkYXRhLXYtMzA5MzMxNTI9IiI+PHBhdGggZD0iTSAyLDMgQyAxLjQ0NzczODEsMy4wMDAwNTUyIDEuMDAwMDU1MiwzLjQ0NzczODEgMSw0IHYgMjAgYyA1LjUyZS01LDAuNTUyMjYyIDAuNDQ3NzM4MSwwLjk5OTk0NSAxLDEgaCAyOCBjIDAuNTUyMjYyLC01LjVlLTUgMC45OTk5NDUsLTAuNDQ3NzM4IDEsLTEgViA0IEMgMzAuOTk5OTQ1LDMuNDQ3NzM4MSAzMC41NTIyNjIsMy4wMDAwNTUyIDMwLDMgWiBtIDE0LDE4IGMgMC41NTIyODUsMCAxLDAuNDQ3NzE1IDEsMSAwLDAuNTUyMjg1IC0wLjQ0NzcxNSwxIC0xLDEgLTAuNTUyMjg1LDAgLTEsLTAuNDQ3NzE1IC0xLC0xIDAsLTAuNTUyMjg1IDAuNDQ3NzE1LC0xIDEsLTEgeiBtIC0xLDUgdiAxLjAwMTk1MyBoIC0zLjA5OTYwOSBjIC0xLjMzNDYzNSwwLjA2OTAxIC0xLjIzMTEyLDIuMDcwOTYzIDAuMTAzNTE1LDIuMDAxOTUzIGggNy45OTQxNDEgYyAxLjMzNDYzNSwwIDEuMzM0NjM1LC0yLjAwMTk1MyAwLC0yLjAwMTk1MyBIIDE3IFYgMjYgWiIgdHJhbnNmb3JtPSJtYXRyaXgoMC4yNjQ1ODMzMywwLDAsMC4yNjQ1ODMzMywwLDI4OC41MzMzMikiIGRhdGEtdi0zMDkzMzE1Mj0iIj48L3BhdGg+PC9nPjwvc3ZnPg==) no-repeat left center transparent;
  background-size:100% 100%;
}

.xcloud::before {
  content:"\0000a0";
  display:inline-flex;
  height:1rem;
  width:1rem;
  line-height:1rem;
  margin:0px 10px 0px 0px;
  position:relative;
  top:0px;
  left:0px;
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iY2xvdWQtaWNvbiIgc3R5bGU9ImZpbGw6IHdoaXRlOyIgdmlld0JveD0iMCAwIDQ4IDQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0zMDkzMzE1Mj0iIj48cGF0aCBkPSJNMCAwaDQ4djQ4aC00OHoiIGZpbGw9Im5vbmUiIGRhdGEtdi0zMDkzMzE1Mj0iIj48L3BhdGg+PHBhdGggZD0iTTM4LjcxIDIwLjA3Yy0xLjM2LTYuODgtNy40My0xMi4wNy0xNC43MS0xMi4wNy01Ljc4IDAtMTAuNzkgMy4yOC0xMy4zIDguMDctNi4wMS42NS0xMC43IDUuNzQtMTAuNyAxMS45MyAwIDYuNjMgNS4zNyAxMiAxMiAxMmgyNmM1LjUyIDAgMTAtNC40OCAxMC0xMCAwLTUuMjgtNC4xMS05LjU2LTkuMjktOS45M3oiIGRhdGEtdi0zMDkzMzE1Mj0iIj48L3BhdGg+PC9zdmc+) no-repeat left center transparent;
  background-size:100% 100%;
}

.selected {
  outline: none;
}

.purple {
    background-color: var(--purple);
}
  
.pink {
    background-color: var(--pink);
}

.orange {
    background-color: var(--orange);
}

.red {
    background-color: var(--red);
}


</style>