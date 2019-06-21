<template>
  <div class="tips-import">
    <input type="file" @change="importf($event)">
    <div id="demo"></div>
    <div>
      <button class="tap"  @click="export2Excel">导出表格</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileTemp: null,
      importVisible: true,
      wb: "",
      rABS: false,
      tableData: [
        {'index':'0',"nickName": "沙滩搁浅我们的旧时光", "name": "小明"},
        {'index':'1',"nickName": "女人天生高贵", "name": "小红"},
        {'index':'2',"nickName": "海是彩色的灰尘", "name": "小兰"}
      ]
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
    },

    // 导出
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('./Export2Excel.js');
        const tHeader = ['序号', '昵称', '姓名'];
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['index', 'nickName', 'name'];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData;  //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '列表excel');
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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

