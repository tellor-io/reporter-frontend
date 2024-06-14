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
      if (App.chainId === 1) {
        App.contracts.Contest.options.address = "0x8cFc184c877154a8F9ffE0fe75649dbe5e2DBEbf" //eth main
      }
      if (App.chainId === 11155111) {
        App.contracts.Contest.options.address = "0xB19584Be015c04cf6CFBF6370Fe94a58b7A38830" // Eth Sepolia
      }
      if (App.chainId === 137) {
        App.contracts.Contest.options.address = "0x8cFc184c877154a8F9ffE0fe75649dbe5e2DBEbf" //polygon main
      }
      if (App.chainId === 80002) {
        App.contracts.Contest.options.address = "0xe331Afe3a8D7836bEdF1F09bC91549f4bc8c60C9" //polygon amoy
      }
      if (App.chainId === 100) {
        App.contracts.Contest.options.address = "0x8cFc184c877154a8F9ffE0fe75649dbe5e2DBEbf" //gnosis main
      }
      if (App.chainId === 10200) {
        App.contracts.Contest.options.address = "0xD9157453E2668B2fc45b7A803D3FEF3642430cC0" // gnosis chiado
      }
      if (App.chainId === 10) {
        App.contracts.Contest.options.address = "0xe331Afe3a8D7836bEdF1F09bC91549f4bc8c60C9" //optimism main
      }
      if (App.chainId === 11155420) {
        App.contracts.Contest.options.address = "0x9EA18BFDB50E9bb4A18F9d3Df7804E398F8fE0dc" //optimism sepolia
      }
      if (App.chainId === 42161) {
        App.contracts.Contest.options.address = "0x8cFc184c877154a8F9ffE0fe75649dbe5e2DBEbf" // arbitrum main
      }
      if (App.chainId === 421614) {
        App.contracts.Contest.options.address = "0x6684E5DdbEe1b97E10847468cB5f4e38f3aB83FE" //arbitrum sepolia
      }
      if (App.chainId === 3141) {
        App.contracts.Contest.options.address = "0x8cFc184c877154a8F9ffE0fe75649dbe5e2DBEbf" //filecoin main
      }
      if (App.chainId === 324)  {
        App.contracts.Token.options.address = "0x61e3BE234D7EE7b1e2a1fA84027105c733b91545" // zksync  Mainnet
      }
      if (App.chainId === 300)  {
        App.contracts.Token.options.address = "0x61e3BE234D7EE7b1e2a1fA84027105c733b91545" // zksync Era Testnet
      }
      if (App.chainId === 1101) {
        App.contracts.Contest.options.address = "0xD9157453E2668B2fc45b7A803D3FEF3642430cC0" // polygon zkevm mainnet
      }
      if (App.chainId === 1442) {
        App.contracts.Contest.options.address = "0xD9157453E2668B2fc45b7A803D3FEF3642430cC0" // polygon zkevm  testnet
      }
      if (App.chainId === 60808) {
        App.contracts.Contest.options.address = "0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc" //Bob Mainnet
      }
      if (App.chainId === 252) {
        App.contracts.Contest.options.address = "0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc" //fraxtal main
      }
      if (App.chainId === 2522) {
        App.contracts.Contest.options.address = "0x6684E5DdbEe1b97E10847468cB5f4e38f3aB83FE" // Fraxtal tesetnet (holesky)
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
      if (App.chainId === 11155111) {
        App.contracts.Token.options.address = "0x80fc34a2f9FfE86F41580F47368289C402DEc660" //eth sepolia 
      } 
      if (App.chainId === 1)  {
        App.contracts.Token.options.address = "0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0" // eth main
      } 
      if (App.chainId === 137)  {
        App.contracts.Token.options.address = "0xE3322702BEdaaEd36CdDAb233360B939775ae5f1" // polygon main
      }
      if (App.chainId === 80002)  {
        App.contracts.Token.options.address = "0xC866DB9021fe81856fF6c5B3E3514BF9D1593D81" // polygon Amoy
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
      if (App.chainId === 11155420)  {
        App.contracts.Token.options.address = "0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc" //optimism sepolia
      }
      if (App.chainId === 42161)  {
        App.contracts.Token.options.address = "0xd58D345Fd9c82262E087d2D0607624B410D88242" // arbitrum one
      }
      if (App.chainId === 421614)  {
        App.contracts.Token.options.address = "0xC866DB9021fe81856fF6c5B3E3514BF9D1593D81" // arbitrum sepolia
      }
      if (App.chainId === 3141)  {
        App.contracts.Token.options.address = "0xe7147C5Ed14F545B4B17251992D1DB2bdfa26B6d" // filecoin hyperspace
      }
      if (App.chainId === 324)  {
        App.contracts.Token.options.address = "0xe7147C5Ed14F545B4B17251992D1DB2bdfa26B6d" // zksync mainnet
      }
      if (App.chainId === 300)  {
        App.contracts.Token.options.address = "0x61e3BE234D7EE7b1e2a1fA84027105c733b91545" // zksync era
      }
      if (App.chainId === 1101)  {
        App.contracts.Token.options.address = "0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc" // polygon zkevm
      }
      if (App.chainId === 1442)  {
        App.contracts.Token.options.address = "0x03346b2F4BC23fd7f4935f74E70c7a7FebC45313" // polygon zkevm sepolia
      }
      if (App.chainId === 60808)  {
        App.contracts.Token.options.address = "0x896419Ed2E0dC848a1f7d2814F4e5Df4b9B9bFcc" // BOB Mainnet
      }
      if (App.chainId === 252)  {
        App.contracts.Token.options.address = "0x665060707c3Ea3c31b3eaBaD7F409072446E1D50" // Fraxtal Mainnet
      }
      if (App.chainId === 2522)  {
        App.contracts.Token.options.address = "0x665060707c3Ea3c31b3eaBaD7F409072446E1D50" // Fraxtal Testnet
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
    let queryId = document.getElementById("_queryId").value;
    let value = document.getElementById("_value").value;
    let nonce = document.getElementById("_nonce").value;
    let queryData = document.getElementById("_queryData").value;
    let decodedQueryData;

    console.log("Raw queryData:", queryData);

    try {
      // Assuming the structure includes three strings based on your previous message
      decodedQueryData = web3.eth.abi.decodeParameters([
        {type: 'string', name: 'query_type'},
      ], queryData);

      console.log("Decoded Data: ", decodedQueryData);
    } catch (error) {
      console.error("Error decoding queryData. It might not be correctly formatted or the types might be wrong.", error);
      return; // Optionally return if the data is critical and cannot proceed without decoding
    }

    // Now check the decoded data
    if (decodedQueryData.query_type === 'SpotPrice' && value.length !== 66) {
      alert('For SpotPrice, _value must be a 66 characters long string including 0x prefix.');
      return; // Stop execution if validation fails
    }

    // Continue with submission if validation passes
    App.contracts.Contest.methods
      .submitValue(queryId, value, nonce, queryData)
      .send({ from: App.account })
      .then(function (result) {
        console.log("Submission result: ", result);
      }).catch(function (error) {
        console.error("Error in submission: ", error);
      });
  },

  //     value = "0x" + App.uintTob32(web3.utils.toWei(document.getElementById("_value").value, 'ether')).padStart(64, '0');




  stakeToken: function () {
    let stakeAmountInput = document.getElementById("stakeAmount").value;
    if (!stakeAmountInput) {
      console.log("No stake amount entered. Skipping staking process.");
      return; // Exit the function if no input is provided
    }
    let stakeAmount = BigInt(stakeAmountInput) * 1000000000000000000n;
    let tokenContract = App.contracts.Token;
    let contestContractAddress = App.contracts.Contest.options.address;

    // Check current allowance
    tokenContract.methods.allowance(App.account, contestContractAddress).call()
      .then(function (allowance) {
        if (BigInt(allowance) < stakeAmount) {
          // Not enough allowance, need to approve
          return tokenContract.methods.approve(contestContractAddress, stakeAmount.toString()).send({ from: App.account });
        }
        return Promise.resolve();
      })
      .then(function () {
        // Now we can proceed to stake since allowance is set
        return App.contracts.Contest.methods.depositStake(stakeAmount.toString()).send({ from: App.account });
      })
      .then(function (result) {
        console.log("Stake transaction successful:", result);
      })
      .catch(function (error) {
        console.error("Staking failed:", error);
      });
  },
};

$(function () {
  $(window).load(function () {
    document.getElementById("connectButton").disabled = false;
    // App.init();
  });
});
