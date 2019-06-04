<template>
  <div class="tips-import">
    <input type="file" @change="importf($event)">
    <div id="demo"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileTemp: null,
      importVisible: true,
      wb: "",
      rABS: false
    };
  },

  methods: {
    importf(event) {
      var files = event.target.files;
      console.log(files);
      //导入
      if (!files) {
        return;
      }
      var f = files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        if (this.rABS) {
          this.wb = XLSX.read(btoa(this.fixdata(data)), {
            //手动转化
            type: "base64"
          });
        } else {
          this.wb = XLSX.read(data, {
            type: "binary"
          });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        console.log(
          XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]], {
            header: 0
          })
        );
        document.getElementById("demo").innerHTML = JSON.stringify(
          XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])
        );
      };
      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    fixdata(data) {
      //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    }
  },
  created() {
    // document.cookie='token=' + 123333
    //     this.$router.push('/cinema');
    }
};
</script>

<style scoped>
</style>

