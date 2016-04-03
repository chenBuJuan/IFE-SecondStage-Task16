/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};       //json

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {

    var Ocity = document.getElementById('aqi-city-input');
    var Onum = document.getElementById('aqi-value-input');
    var Ocv,Onv;
    var regCity,regNum;
    
    Ocity.placeholder = '';
    Onum.placeholder = '';
    
    Ocv = Ocity.value;
    Onv = Onum.value;
    
    Ocv = Ocv.replace(/\s+/g,"");
    Onv = Onv.replace(/\s+/g,"");
    
    regCity = /^[\u4e00-\u9fa5]+$/;
    regNum = /^[0-9]+$/;
    
    if(regCity.test(Ocv) && regNum.test(Onv)){
        
        aqiData[Ocv] = Onv;
        
    }else{
        
        if(!regCity.test(Ocv) && !regNum.test(Onv)){
            
            Ocity.placeholder = '请正确输入';
            Onum.placeholder = '请正确输入';
            
        }else if(!regCity.test(Ocv)){
            
            Ocity.placeholder = '请正确输入';
            
        }else{
            
            Onum.placeholder = '请正确输入';
            
        }
        
    }
    
    Ocity.value = '';
    Onum.value = '';

}

/**
 * 渲染aqi-table表格
 */

function renderAqiList() {

    var Otable = document.getElementById('aqi-table');
    var newRow = document.createElement('tr');
    var newRows = [];
    var index = 0;
    
    Otable.innerHTML = '';
    newRow.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>';
    Otable.appendChild(newRow);
    
    for(var city in aqiData){
        
        newRows[index] = document.createElement('tr');
        newRows[index].innerHTML = '<td>'+city+'</td><td>'+aqiData[city]+'</td><td><button>删除</button></td>';
        Otable.appendChild(newRows[index]);
        index++;
        
    }
    
    init();

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */

function addBtnHandle() {
    
  addAqiData();
  renderAqiList();
  
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */

function delBtnHandle() {
  // do sth.
  
  delete aqiData[this.parentNode.parentNode.firstChild.innerHTML];
  renderAqiList();
  
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  
  var Obtn = document.getElementById('add-btn');
  
  Obtn.addEventListener('click',addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
  var Odel = document.getElementById('aqi-table').getElementsByTagName('button');
  
  for(var i = 0 ; i < Odel.length ; i ++){
      
      Odel[i].addEventListener('click',delBtnHandle);
      
  }

}

init();