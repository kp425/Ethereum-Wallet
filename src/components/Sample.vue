<template>

<div>
  <!-- <h1>Your balance</h1>
  <div></div>
  <p></p> -->
  <h1>Check Balance</h1>
  <label>Check Balance</label>
  <input v-model="address" placeholder="Enter address"></input>
  <button v-on:click="handleClick('balanceOf')">submit</button>
  <p></p>
  <div>Balance : {{balanceOf}}</div>
  
  <p></p>
  <h1>Transfer Funds</h1>
  <label>Address to send</label>
  <input v-model="recieverAddress" placeholder="Enter address"></input>
  <p></p>
  <label>Amount</label>
  <input v-model="amount" placeholder="Enter amount"></input>
  <p></p>
  <button v-on:click="handleClick('transfer')">submit</button>
  <p></p>
  <div>{{transactionStatus}}</div>
  <p></p>
  <h1>Is this an Address?</h1>
  <label>Address</label>
  <input v-model = "isAddress" placeholder="Enter Address"></input>
  <p></p>
  <button v-on:click="handleClick('isAddress')">Submit</button>
  <p></p>
  <div>{{addressValidity}}</div>




</div>

</template>




<script>

import {getBalance,sendFunds,isAddress} from '../assets/contracts'

export default {
  name : 'sample',
  data () {
    return {
      amount:0,
      address:'',
      recieverAddress:'',
      transactionStatus:'',
      balanceOf:0,
      isAddress:'',
      addressValidity:false


    }
  },
  methods:{
    handleInput:function(property){
      
    },
    handleClick:function(property){
      // console.log(this.$data[property])
      if (property == "balanceOf"){
          let balance = getBalance(this.address,(result)=>{
            this.balanceOf=result
          })
      } else if (property == "transfer"){
            sendFunds(this.recieverAddress,this.amount,(result)=>{
                if(result){
                    this.transactionStatus = 'Funds transfered successfully!'
                } else {
                    this.transactionStatus = 'transfer failed!'
                }
            })
      } else if (property == "isAddress") {
            isAddress(this.isAddress,(result)=>{
                this.addressValidity = result   
            })
      }

    }

  }
}
</script>


<style scoped>

</style>

