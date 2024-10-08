import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/api/supabase'
import useAuthUser from '@/auth/useAuthUser'
const authUser = useAuthUser()
export const useDataStore = defineStore('mydata', () => {
  const bangban_data= ref<any>([])
  const todayData = ref<any>([])
  const user = ref("")
  const today = new Date().toISOString().slice(0,10)
  async function getBangban_data(){
    await supabase
      .from('bangban')
      .select('*')
      .then((res)=>{
        console.log(res.data)
        bangban_data.value = res!.data!
        todayData.value = res.data!.filter(item=>{
          // console.log(item.submitDate)
          return item.submitDate === today && item.email === user.value
        })
      })
    console.log(todayData.value)

  }
  // const insertBangban_data = (async (insert_data:{'business':string,'submitDate':string}) =>{
  //   return await supabase
  //   .from('bangban')
  //   .insert([
  //     { business: insert_data.business, submitDate: insert_data.submitDate},
  //   ])
  // })
  async function insertBangban_data(insert_data:{'business':string,'submitDate':string,'id':number}) {
    return await supabase
    .from('bangban')
    .insert([
      { business: insert_data.business, submitDate: insert_data.submitDate,email:user.value},
    ])
    .then((res)=>{
      getBangban_data()
    })
  }
  async function updateBangban_data(insert_data:{'id':number,'business':string,'submitDate':string}) {
    console.log(insert_data.id)
    return await supabase
      .from('bangban')
      .update({ business: insert_data.business})
      .eq('id',  insert_data.id)
      .then((res)=>{
        getBangban_data()
      }
      )
  }
  async function querybangban_data(jiange_Date) {
    console.log(jiange_Date[0])
    console.log(jiange_Date[0].toISOString().slice(0,10))
    return await supabase
      .from('bangban')
      .select()
      .gte('submitDate', jiange_Date[0].toISOString().slice(0,10))
      .lte('submitDate', jiange_Date[1].toISOString().slice(0,10))
  }

  function isTodayDataExists():number| null{
    for (const item of bangban_data.value){
      console.log(bangban_data.value)
        const itemDate = new Date(item.submitDate).toLocaleDateString()
        if (itemDate == new Date().toLocaleDateString() && item.email == user.value ) {
          console.log('pipei')
          return item.id
        }
    }
    return null
  }
  async function signOut() {
    authUser.logout().then(res=>{
      console.log(res)
    })
    user.value =""
    authUser.user.value = ""
  }
  const data = {
    "banli_url":{
      "id":'https://zwdt.sh.gov.cn/govPortals/bsfw/item/'
    },
    "minzhen":[
      {
      "id":"http://credit.fgw.sh.gov.cn/",
      "name":"信用中国（上海）"
    }],
    "shuiwu":[
      {
      "id":"https://etax.shanghai.chinatax.gov.cn/sxsq-web/wszx-front/apps/views/xbnsrzhtcsq_wrt_cxb/xbnsrDl.html",
      "name":"新办纳税人套餐办理"
    },
    {
      "id":"https://etax.shanghai.chinatax.gov.cn",
      "name":"国家税务总局上海市税务局官网"
    },
  ],
    "yubaozhuangchaxun":{
      "id":'https://xk.scjgj.sh.gov.cn/xzxk_wbjg/#/licenceListscjgj?type=00111',
      "name":'仅销售预包装食品备案查询'
    },
    "xinbanqiye":{
      "id":'https://yct.sh.gov.cn/portal_yct/',
      "name":'企业登记在线'
    },
    "zhangchengfanben":{
      "id":'https://yct.sh.gov.cn/portal_yct/webportal/v2/templateOfApplicationDoucments',
      "name":'章程范本'
    },
    "shuziqianming":{
      "id":'https://yct.sh.gov.cn/elec/user/toSelectLogin',
      "name":'数字签名'
    },
    "kuaquqianyi":{
      "id":'https://yct.sh.gov.cn/portal_yct/etpslogin/tips?sysTo=move&redirectUrl=http://yct.sh.gov.cn/bizhallnz_yctnew/transferToYct',
      "name":'跨区迁移'
    },
    "guojiaqiyexinyong":{
      "id":'https://fw.scjgj.sh.gov.cn/noticerpt/user/popup_login',
      "name":'国家企业信用公示网'
    },
    "minchengshenbao":{
      "id":'https://fw.scjgj.sh.gov.cn/nameqry/toCheckNameIndex.action',
      "name":'企业名称自主申办（企业更名）'
    },
    "danganchaxun":{
      "id":'https://fw.scjgj.sh.gov.cn/achieve_outer/apply/mainEtps',
      "name":'企业档案查询'
    },
    "qiyebiangeng": [
      {
      "id": "e661e9da-d47e-4231-b5d5-0f39a4ab88a7",
      "name": "企业变更 "
      },
    ],
    "shipin": [
      {
      "id": "51dd6e47-4c9a-42dd-96aa-c5701887ef5f",
      "name": "新办 "
      },
      {
      "id": "b0e86678-7afe-45ad-bff9-ae44214be07a",
      "name": "依申请变更 "
      },
      {
      "id": "d037b610-27c9-48b5-bda2-4109acf1f465",
      "name": "延续 "
      },
      {
      "id": "882bfbbb-5d4e-46e8-8593-1c4769b540f8",
      "name": "注销 "
      },
      {
      "id": "dfcbbca6-9971-4912-bf9c-01d73c9109b3",
      "name": "仅销售预包装食品备案 "
      }
    ],
    "jiulei": [
      {
      "id": "757b0b89-2228-9051-b259-29a5fb75b149",
      "name": "新办 "
      },
      {
      "id": "88ed4ddb-9f5b-b65d-1e94-a3a0dec4fc26",
      "name": "依申请变更 "
      },
      {
      "id": "8ed2791a-b40c-d0bc-50f2-4c21221ce149",
      "name": "延续 "
      },
      {
      "id": "fc2d1c29-baa2-5b4e-157f-5ae5ae5fc354",
      "name": "注销 "
      }
    ],
    "jiuleipifa": [
      {
      "id": "4dae4191-5e6c-272c-6e2f-330100601277",
      "name": "新办 "
      },
      {
      "id": "84a9f405-ff5c-b252-374e-646015e5255e",
      "name": "依申请变更 "
      },
      {
      "id": "c79f50a4-a4c0-bb0d-8547-c6814e1486be",
      "name": "延续 "
      },
      {
      "id": "a5fbf885-139b-b086-db59-6ab49a88cf82",
      "name": "注销 "
      }
    ],
    "tezhongshebei": [
      {
      "id": "27489289-28ed-4a76-ab27-8e0053f4934e",
      "name": "新办 "
      },
      {
      "id": "28a3dbc1-5505-476f-9a06-be8d4e5d8143",
      "name": "复审  "
      }
    ],
    "gonggongweisheng": [
      {
      "id": "090ca97e-9fe7-4b55-922f-7ccedeff6e63",
      "name": "新办 "
      },
      {
      "id": "b1c2011a-5076-447f-aba1-8401fd590b35",
      "name": "依申请变更 "
      },
      {
      "id": "b32c61a6-bb90-4e71-a7f4-a6eeb886e266",
      "name": "延续 "
      },
      {
      "id": "d4f59c79-789c-49b7-8fd1-b4813ee08e23",
      "name": "注销 "
      }
    ],

    "yiliao": [
      {
      "id": "d852d6fd-2635-4beb-9f9f-49a0c98dc759",
      "name": "新办 "
      },
      {
      "id": "93fae7ed-35ac-4ef5-bd65-a653a9e77f2f",
      "name": "注销 "
      }
    ],
  }

  return {
    data,
    user,
    signOut,
    bangban_data,
    getBangban_data,
    insertBangban_data,
    updateBangban_data,
    todayData,
    querybangban_data,
    isTodayDataExists}
})

