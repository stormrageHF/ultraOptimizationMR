<template>
  <div class="content_box">
    <div class="video_box">
      <video
        v-if="false"
        src="https://video.idoctor.cc/897d5132d1f244bb934b186dd788962f/4f0d7ec62413df239dad758a5acd0be8-sd.mp4"
        controls="controls"
        poster="https://video.idoctor.cc/image/cover/E0374B9C0E2C4B8A8CED7C5F6C5913F7-6-2.png"
        loop
        width="800"
        height="450"
      >您的浏览器不支持 video 标签。</video>
    </div>
  </div>
</template>

<script>
export default {
  name: "Msite",
  mounted() {
    console.log(this.$route);
  }
};
</script>

<style scoped>
.content_box {
  background: url(../../assets/images/ultra-mr02.jpg) no-repeat right
    top;
  background-size: cover;
  min-height: 900px;
  min-width: 1000px;
  /* width: 100%; */
  /* height: calc(100vh - 190px); */
  /* height: 1000px; */
  /* z-index: 0; */
  margin-top: 0px;
  padding: 0px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}
@media screen and (max-width: 1400px) {
  .content_box{
    min-height: 700px;
  }
}
.video_box {
  position: absolute;
  /* width: 800px;
  height: 450px; */
  left: 160px;
  top: 110px;
  /* background-color: #ffffff; */
}
</style>
<style>
.content_box {
  min-height: 750px;
  height: 100%;
  /* margin: 40px auto 0; */
  box-sizing: border-box;
}
</style>