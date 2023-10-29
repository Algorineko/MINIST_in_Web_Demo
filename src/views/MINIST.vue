<template>
  <div class="row">
    <div class="mainpart col-md-10 offset-md-1">
      <h1 class="text-start">手写数字识别</h1>
      <br><br>
      <div class="row">
        <div class="setBtn col-md-4 offset-md-0 border-end">
          <h4 class="text-start">1. 上传图片</h4>
          <br>
          <div class="alert-box-item">
            <div class="bigImg-div" @click="toGetImg">
              <img class="bigImg" :src=valueUrl v-if="valueUrl">
            </div>
          </div>
        </div>
        <div class="col-md-6 offset-md-0">
          <h4 class="">2. 数字识别为:{{ recognizedNum }}</h4>

          <table class="table table-sm table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">标签</th>
                <th scope="col">预测概率</th>
              </tr>
            </thead>
            <tbody>
              <!-- 使用 v-for 指令来遍历 probabilities 数组 -->
              <tr v-for="(prob, index) in probabilities" :key="index">
                <!-- 使用 index 作为标签 -->
                <th scope="row">{{ index }}</th>
                <!-- 使用 prob 作为预测概率 -->
                <td>{{ prob }}%</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <br>
    </div>
</div>
</template>

<script>
  import axios from 'axios';
  let inputElement = null
	export default {
		data() {
			return {
				valueUrl: '',
        recognizedNum:null,
        probabilities:[],
			}
		},
		methods: {
			toGetImg() {
				if (inputElement === null) {
				// 生成文件上传的控件
					inputElement = document.createElement('input')
					inputElement.setAttribute('type', 'file')
					inputElement.style.display = 'none'
					if (window.addEventListener) {
						inputElement.addEventListener('change', this.uploadFile, false)
					} else {
						inputElement.attachEvent('onchange', this.uploadFile)
					}
					document.body.appendChild(inputElement)
				}
				inputElement.click()
			},
			uploadFile(el) {
				if (el && el.target && el.target.files && el.target.files.length > 0) {
					// console.log(el)
					const files = el.target.files[0]
					const isLt2M = files.size / 1024 / 1024 < 2
					// const size = files.size / 1024 / 1024
					// console.log(size)
					// 判断上传文件的大小
					if (!isLt2M) {
						this.$message.error('上传图片大小不能超过 2MB!')
					} else if (files.type.indexOf('image') === -1) { //如果不是图片格式
						// this.$dialog.toast({ mes: '请选择图片文件' });
						this.$message.error('请选择图片文件');
					} else {
						const that = this;
						const reader = new FileReader(); // 创建读取文件对象
						reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
						reader.onload = function() { // 文件读取完成后
							// 读取完成后，将结果赋值给img的src
							that.valueUrl = this.result;
							// console.log(this.result);
              // 使用 Axios 发送图片到后端
              const formData = new FormData();
              formData.append('image', files);
              axios.post('http://127.0.0.1:8000/recognition', formData)
              .then(response => {
                // 处理后端返回的结果
                console.log(response.data.message);
                that.recognizedNum = response.data.message;
                that.probabilities = response.data.probabilities;
              })
              .catch(error => {
                console.error('Error uploading image:', error);
                if (error.response) {
                  console.log('Server responded with non-2xx status:', error.response.data);
                }
              });
						};
					}
				}
			}
		},
		beforeDestroy() {
      if (inputElement) {
        if (window.addEventListener) {
          inputElement.removeEventListener('change', this.onGetLocalFile, false)
        } else {
          inputElement.detachEvent('onchange', this.onGetLocalFile)
        }
        document.body.removeChild(inputElement)
        inputElement = null
        console.log('========inputelement destroy')
      }
    }
	}
</script>

<style>
	.alert-box-item {
		overflow: hidden;
	}
	.bigImg-div {
		width: 200px;
		height: 200px;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #00000072;
	}
	.bigImg {
		display: block;
		width: 200px;
		height: 200px;
		border-radius: 100%;
	}
  .nav_header {
    font-size: large;
    font-weight: bold;
    color: rgb(21, 3, 55);
  }
  .show_area{
    padding: 0;
  }
  .mainpart{
    padding: 5% 0px;
  }
</style>
