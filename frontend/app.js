var App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  accounts: [],
  contestAddress: {}, 
  tokenAddress: {},
  web3,
  tokenDecimals: 0,

  init: function () {
    return App.initWeb3();a
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      console.log("Using web3 detected from external source like Metamask");
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
    } else {
      console.log("Using localhost");
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    return App.initEth();
  },

  initEth: function () {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(function (accounts) {
        console.log("Ethereum enabled");
        App.account = accounts[0];
        console.log("In initEth: " + App.account);
        web3.eth.getChainId().then(function (result) {
          App.chainId = result;
          console.log("Chain ID: " + App.chainId);
          return App.initContestContract();
        })
      });
  },

  initContestContract: function () {
    var pathToAbi = "./abis/TheContest.json";
    $.getJSON(pathToAbi, function (abi) {
      App.contracts.Contest = new web3.eth.Contract(abi);
      console.log(App.chainId)
      if (App.chainId === 421613) {
        App.contracts.Contest.options.address = "0xb2CB696fE5244fB9004877e58dcB680cB86Ba444" 
      }
     else  {
        App.contracts.Contest.options.address = "0xD9157453E2668B2fc45b7A803D3FEF3642430cC0" 
      }
      console.log(App.chainId)
      console.log("Contract initialized");
      console.log("Contract address: " +  App.contracts.Contest.options.address);
      console.log("this is ryan", App.contracts.contestAddress);
      console.log("this is ryan", App.tokenBalance);
      console.log("this is staker", App.contracts.Contest.getStakerInfo);
      return App.initTokenContract();
    });
  },

  initTokenContract: function () {
    var pathToAbi = "./abis/ERC20.json";
    $.getJSON(pathToAbi, function (abi) {
      App.contracts.Token = new web3.eth.Contract(abi);
      if (App.chainId === 5) {
        App.contracts.Token.options.address = "0x51c59c6cAd28ce3693977F2feB4CfAebec30d8a2" //eth goerli 
      } 
      if (App.chainId === 1)  {
        App.contracts.Token.options.address = "0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0" // eth main
      } 
      if (App.chainId === 137)  {
        App.contracts.Token.options.address = "0xE3322702BEdaaEd36CdDAb233360B939775ae5f1" // polygon main
      }
      if (App.chainId === 80001)  {
        App.contracts.Token.options.address = "0xce4e32fe9d894f8185271aa990d2db425df3e6be" // polygon mumbai
      } 
      if (App.chainId === 100)  {
        App.contracts.Token.options.address = "0xAAd66432d27737ecf6ED183160Adc5eF36aB99f2" // gnosis main
      } 
      if (App.chainId === 10200)  {
        App.contracts.Token.options.address = "0xe7147C5Ed14F545B4B17251992D1DB2bdfa26B6d" // gnosis chiado
      }
      if (App.chainId === 10)  {
        App.contracts.Token.options.address = "0xaf8cA653Fa2772d58f4368B0a71980e9E3cEB888" // optimism mainnet
      }
      if (App.chainId === 420)  {
        App.contracts.Token.options.address = "0x3251838bd813fdf6a97D32781e011cce8D225d59" //optimism goerli
      }
      if (App.chainId === 42161)  {
        App.contracts.Token.options.address = "0xd58D345Fd9c82262E087d2D0607624B410D88242" // arbitrum one
      }
      if (App.chainId === 421613)  {
        App.contracts.Token.options.address = "0x8d1bB5eDdFce08B92dD47c9871d1805211C3Eb3C" // arbitrum goerli
      }
      if (App.chainId === 3141)  {
        App.contracts.Token.options.address = "0xe7147C5Ed14F545B4B17251992D1DB2bdfa26B6d" // filecoin hyperspace
      }
      console.log("Token contract initialized");
      console.log(
        "Token contract address: ", App.contracts.Token.options.address
      );
      return App.getTokenDecimals();
    });
  },

  
  getTokenDecimals: function () {
    App.contracts.Token.methods
      .decimals()
      .call()
      .then(function (result) {
        App.tokenDecimals = result;
        return App.setPageParams();
      });
  },

  

  setPageParams: function () {
    document.getElementById("contestAddress").innerHTML = App.contracts.Contest.options.address;
    document.getElementById("connectedAddress").innerHTML = App.account;
    App.getTokenBalance();
  },



  getTokenBalance: function () {
    App.contracts.Token.methods
      .balanceOf(App.account)
      .call()
      .then(function (result) {
        let tokenBalance = BigInt(result) / BigInt(10 ** App.tokenDecimals);
        let tokenBalanceString = tokenBalance.toString() + " TRB";
        document.getElementById("tokenBalance").innerHTML = tokenBalanceString;
      });
  },

  getStakedTokenBalance: function () {
    App.contracts.Contest.methods
      .getStakerInfo(App.account)
      .call()
      .then(function (result) {
        let stakedTokenBalance = BigInt(result) / BigInt(10 ** App.tokenDecimals);
        let stakedTokenBalanceString = stakedTokenBalance.toString() + " TRB";
        document.getElementById("stakedTokenBalance").innerHTML = stakedTokenBalanceString;
      });
  },



  /*to18: function(n) {
    return ethers.BigNumber.from(n).mul(ethers.BigNumber.from(10).pow(18));
},*/


   /*uintTob32: function (n) {
    let vars = web3.utils.toHex(n);
    vars = vars.slice(2);
    while (vars.length < 64) {
      vars = "0" + vars;
    }
    vars = "0x" + vars;
    return vars;
  },*/

  uintTob32: function (n) {
    let vars = web3.utils.toBN(n).toString('hex');
    vars = vars.padStart(64, '0');
    return  vars;
  },
  

  reportValue: function () {
    queryId = document.getElementById("_queryId").value;
    value = document.getElementById("_value").value;
    nonce = document.getElementById("_nonce").value;
    queryData = document.getElementById("_queryData").value;
    console.log("_queryId: " + queryId);
    console.log("_value: "  + value.padStart(64, '0'));
    console.log("_nonce: " + nonce);
    console.log("_queryData: " + queryData);
    App.contracts.Contest.methods
      .submitValue(queryId, value, nonce, queryData)
      .send({ from: App.account })
      .then(function (result) {
        console.log(result);
      });
  },

  //     value = "0x" + App.uintTob32(web3.utils.toWei(document.getElementById("_value").value, 'ether')).padStart(64, '0');




  stakeToken: function () {
  stakeAmount = (document.getElementById("stakeAmount").value)*100000000000000000n;
  console.log("stakeAmount: " + stakeAmount);
  App.contracts.Contest.methods
    .depositStake(stakeAmount)
    .send({ from: App.account })
    .then(function (result) {
      console.log(result);
    });
},
};

$(function () {
  $(window).load(function () {
    document.getElementById("connectButton").disabled = false;
    // App.init();
  });
});
