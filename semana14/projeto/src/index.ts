import createAccount from "./createAccount";
import getBalance from "./getBalance";
import addBalance from "./addBalance";
import payBill from "./payBill";
import updateBalance from "./updateBalance";
import performTransfer from "./performTransfer";
import printAllAccounts from "./printAllAccounts";

main(process.argv);

function main(args: string[]) {
  switch (args[2]) {
    case "create": {
      createAccount(args[3], Number(args[4]), args[5]);
      break;
    }
    case "balance": {
      getBalance(args[3], Number(args[4]));
      break;
    }
    case "deposit": {
      addBalance(args[3], Number(args[4]), Number(args[5]));
      break;
    }
    case "pay": {
      payBill(Number(args[3]), Number(args[4]), args[5], args[6]);
      break;
    }
    case "update": {
      updateBalance();
      break;
    }
    case "transfer": {
      performTransfer(
        args[3],
        Number(args[4]),
        args[5],
        Number(args[6]),
        Number(args[7]),
        args[8],
        args[9]
      );
      break;
    }
    case "print": {
      printAllAccounts();
      break;
    }
    default:
      printAllAccounts();
      break;
  }
}
