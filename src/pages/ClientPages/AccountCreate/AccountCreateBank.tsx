import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountFormBank from '../../../components/organisms/AccountFormBank'
import SelectAccountTypeForm from '../../../components/organisms/SelectAccountTypeForm'
import ProgressButtonMolecule from '../../../components/molecules/ProgressButtonMolecule'
import { ColorPalette } from '../../../style/ColorPalette'
import { Avatar, Box, FormControlLabel, Slide, Switch } from '@mui/material'
import { ProductService } from '../../../services/product/productService'
import { AccountService } from '../../../services/account/accountService'
import BanQuitoLogo from '../../assets/BanQuito-Logo.svg'
import StripeAtom from '../../../components/atoms/StripeAtom';


const AccountCreateBank = () => {
  const [indexForm, setindexForm] = useState<number>(0)
  const [selectedAccount, setselectedAccount] = useState<string>("");
  const [products, setproducts] = useState<any[] | undefined>([]);

  const navigate = useNavigate();

  const getProducts = async (id: string) => {
    const productsAsync = await ProductService.getProducts(id);
    setproducts(productsAsync);
  }

  const handleTypeAccountButton = (data: string) => {
    setindexForm(1);
    setselectedAccount(data);
    getProducts(data);
  }

  const handleSubmit = (data: any) => {
    const account = {
      ...data,
      codeProductType: selectedAccount
    }
    try {
      saveAccount(account);
      navigate('/usuario', { replace: true });
    } catch (error) {
      console.log("Something went wrong");
    }

  }

  const saveAccount = async (data: any) => {
    await AccountService.createAccount(data);
  }

  return (
    <>
      <ProgressButtonMolecule
        color={ColorPalette.PRIMARY}
        itemsCount={2}
        current={indexForm}
        onUpdate={(value) => setindexForm(value)} />
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: indexForm == 0 ? '1' : '0'
        }}>
          <Slide
            in={indexForm == 0}
            direction={indexForm == 0 ? "left" : "right"}
            mountOnEnter
            unmountOnExit>
            <div>
              <SelectAccountTypeForm
                onSelect={handleTypeAccountButton} />
              <StripeAtom x={'0'} y={'0'} width={'50px'} height='50px' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'50px'} y={'0'} width={'20px'} height='50px' color={ColorPalette.TERNARY} />
              <StripeAtom x={'75px'} y={'0'} width={'10px'} height='50px' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'90px'} y={'0'} width={'5px'} height='50px' color={ColorPalette.FOURTH} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, margin: 3 }}>
                <Avatar variant='square' src={BanQuitoLogo} sx={{ color: ColorPalette.ACCENT }} />
              </div>
            </div>
          </Slide>
        </div>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: indexForm == 1 ? '1' : '0'
        }}>
          <Slide
            in={indexForm == 1}
            direction={indexForm == 1 ? "left" : "right"}
            mountOnEnter
            unmountOnExit>
            <div>
              <div style={{ position: 'absolute', right: '10%', top: 0 }}>
                <AccountFormBank
                  products={products ? products : []}
                  onSubmit={handleSubmit} />
              </div>
              <StripeAtom x={'160px'} y={'0'} width={'250px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'155px'} y={'0'} width={'250px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'150px'} y={'0'} width={'250px'} height='100%' color={'#D9D9D9'} />
              <StripeAtom x={'30px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'25px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'430px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'425px'} y={'0'} width={'100px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'555px'} y={'0'} width={'50px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'550px'} y={'0'} width={'50px'} height='100%' color={ColorPalette.PRIMARY} />
              <StripeAtom x={'615px'} y={'0'} width={'25px'} height='100%' color={ColorPalette.SECONDARY} />
              <StripeAtom x={'610px'} y={'0'} width={'25px'} height='100%' color={ColorPalette.PRIMARY} />
              <div style={{ position: 'absolute', bottom: 'calc(50% - 100px)', left: 'calc(150px + 20px)', margin: 3 }}>
                <Avatar variant='square' src={BanQuitoLogo} sx={{ color: ColorPalette.ACCENT, width: '200px', height: '200px' }} />
              </div>
            </div>
          </Slide>
        </div>
      </div>

    </>
  )
}

export default AccountCreateBank