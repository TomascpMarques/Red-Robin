<template>
  <div class="page-wrap">
    <div class="page-tit">
      <h1>Video Share</h1>
    </div>
    <div class="page-body">
      <div class="left">
        <newVideoShare />
        <searchVideoShare
          @videoSearchResult="updateparent"
          @videoSearchResultAll="updateparent"
        />
      </div>
      <div class="right">
        <div v-for="vid in videos" :key="vid">
          <video-show
            :title="vid.titulo"
            :video="vid.url"
            :desc="vid.descricao"
            :tema="vid.tema"
          />
        </div>
        <!-- <videoShow
          :title="'Task Force Doomer Playlist Remastered Vol.1-3 + Extras'"
          :url="'ERFdlAxW_nk'"
          :desc="'After my channel got wiped off the face of youtube. I lost the majority of my videos since I didn\'t have them backed up. So to bring TFD content back into youtube I made this one video as a solution to the problem.'"
        /> -->
      </div>
    </div>
  </div>
</template>

<script src="./viewmain.js"></script>
<style scoped src="./style.css"></style>
