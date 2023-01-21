import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AccountFormBank from '../components/organisms/AccountFormBank'
import SelectAccountTypeForm from '../components/organisms/SelectAccountTypeForm'
import ProgressButtonMolecule from '../components/molecules/ProgressButtonMolecule'
import { ColorPalette } from '../style/ColorPalette'
import { Box, FormControlLabel, Slide, Switch } from '@mui/material'
import { ProductService } from '../services/product/productService'
import { AccountService } from '../services/account/accountService'


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
      navigate('/client', { replace: true });
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
        <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Slide
            in={indexForm == 0}
            direction={indexForm == 0 ? "left" : "right"}
            mountOnEnter
            unmountOnExit>
            <div>
              <SelectAccountTypeForm
                onSelect={handleTypeAccountButton} />
            </div>
          </Slide>
        </div>
        <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Slide
            in={indexForm == 1}
            direction={indexForm == 1 ? "left" : "right"}
            mountOnEnter
            unmountOnExit>
            <div>
              <AccountFormBank
                products={products ? products : []}
                onSubmit={handleSubmit} />
            </div>
          </Slide>
        </div>
      </div>

    </>
  )
}

export default AccountCreateBank