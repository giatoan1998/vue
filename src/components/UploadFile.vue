<template>
  <div class="upload-box" id="abc">
    <p>Upload your files</p>
    <form action="">
      <input @change="uploadFile" type="file" class="file-input" ref="fileInput" hidden>
      <div @click="$refs.fileInput.click()" class="icon">
        <p>UP</p>
      </div>
      <p>Browser File to Upload</p>
    </form>
    <section v-if="showProgress" class="loading-area">
      <li v-for="(file, index) in files" :key="index" class="row">
        <i class="fa fa-file-text"></i>
        <div class="content">
          <div class="details">
            <span class="name">{{ file.name }}</span>
            <span class="percent">{{ file.loading }} %</span>
          </div>
          <div class="loading-bar">
            <div class="loading" :style="{ width: file.loading +'%' }"></div>
          </div>
        </div>
      </li>
    </section>
    <section v-if="!errors" class="uploaded-area">
      <li v-for="(file, index) in uploadFiles" :key="index" class="row">
        <div class="content upload">
          <i class="fa fa-file-text" aria-hidden="true"></i>
          <div class="details">
            <span class="name">{{ file.name }}</span>
            <span class="size">{{ file.size }}</span>
          </div>
        </div>
        <i class="fa fa-check" aria-hidden="true"></i>
      </li>
    </section>
    <section v-else class="uploaded-area">
      <p style="color: red">The file field must be a file of type: png, jpg, mp4.</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

  export default (await import('vue')).defineComponent({
    data() {
      return {
        files: [],
        uploadFiles: [],
        showProgress: false,
        errors: false,
      };
    },
    methods: {
      uploadFile(event) {
        const file = event.target.files[0];

        if (!file) return
        const fileName = (file.name.length >= 12) ? file.name.substring(0, 13) + '... ' + file.name.substring(file.name.lastIndexOf('.')) : file.name;
        const formData = new FormData();
        formData.append("file", file);
        this.files.push({ name: fileName, loading: 0 });
        this.showProgress = true;
        this.errors = false;

        axios.post('http://127.0.0.1:8000/api/upload-file', formData, {
          onUploadProgress: ({ loaded, total }) => {
            this.files[this.files.length - 1].loading = Math.floor((loaded / total) * 100);

            if (loaded == total) {
              const fileSize = (total < 1024) ? total + ' KB' : (loaded / (1024 * 1024)).toFixed(2) + 'MB';
              this.uploadFiles.push({ name: fileName, size: fileSize });
              this.files = [];
              this.showProgress = false;
            }
          },
        }).catch(error => {
          this.uploadFiles.pop();
          this.errors = true;
        });
      }
    },
  })
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  display: flex;
  font-weight: 500;
  margin-top: 10px;
}
img {
  width: 100%;
}
.icon {
  width: 90px;
  height: 90px;
  background: green;
}
.upload-box {
  width: 100%;
  background: #FFF;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.5);
}
.upload-box form {
  height: 170px;
  display: flex;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #29ba2a;
}
.icon p {
  margin: auto;
  color: #FFF;
}
.icon {
  border-radius: 50%;
  margin: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
}
form :where(i, p){
  color: #29ba2a;
}
form i {
  font-size: 50px;
}
form i {
  margin-top: 16px;
  font-size: 16px;
}
section .row {
  margin-bottom: 10px;
  background: #d0ffd3;
  list-style: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .row i {
  color: #1aaa4c;
  font-size: 26px;
}
section details span {
  font-size: 12px;
}
.loading-area .row .content {
  width: 100%;
  margin-left: 15px;
}
.loading-area .details {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: space-between;
}
.loading-area .content .loading-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #FFF;
  border-radius: 30px;
}
.content .loading-bar .loading {
  height: 100%;
  width: 20%;
  background: #1aaa4c;
  border-radius: inherit;
}
.uploaded-area {
  max-height: 232px;
  overflow: scroll;
}
.uploaded-area.onprogress {
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar {
  width: 0;
}
.uploaded-area .row .content {
  display: flex;
  align-items: center;
}
.uploaded-area .row .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .row .details .size {
  color: #404040;
  font-size: 11px;
}
.uploaded-area i.fa-check {
  font-size: 16px;
}
</style>