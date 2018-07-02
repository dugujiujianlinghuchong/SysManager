import Vue from 'vue'
import Axios from 'axios'


// 提交表单方法
Vue.prototype.submitForm = function (formName, requestAddress, params, func) {
    this.$refs[formName].validate(valid => {
        if (valid) {
            Axios.post(requestAddress, params)
                .then((res) => {
                    func(res.data);
                })
        } else {
            return false;
        }
    });
}

// 打开对话框方法
Vue.prototype.openDialog = function (dialogName, dialogTitle, name) {
    this[dialogName] = true;
    this[dialogTitle] = name;
}

// 删除表格行方法
Vue.prototype.deleteTableRow = function (requestAddress, params) {
    console.log(requestAddress);
    console.log(params);
    Axios.get(requestAddress, { params: params })
        .then(() => {
            this.getTableData();
        })
}