import CryptoJs from 'crypto-js'


const Sx :any = process.env.REACT_APP_XX
export const Dxdt = async(x:number|string)=>{

    const encrypted = CryptoJs.AES.encrypt(x.toString(), Sx).toString();
    const cleanedString = encrypted.replace(/\//g, '_')
    return cleanedString
  }
export const Nxdt = async(x:string)=>{
    const fx=x.replace(/_/g, '/');
    const dx = CryptoJs.AES.decrypt(fx, Sx);
    const decrypted = dx.toString(CryptoJs.enc.Utf8);
    const nx = parseFloat(decrypted);
    return nx
  }

export const NxSRt = async(x:string)=>{
  const fx=x.replace(/_/g, '/');
  const dx = CryptoJs.AES.decrypt(fx, Sx);
  const decrypted = dx.toString(CryptoJs.enc.Utf8);
 
  return decrypted
}

