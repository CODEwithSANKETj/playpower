import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { IoMdAdd } from "react-icons/io";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { toggleTheme } from '../Redux/actions';

function Headers() {
    const theme = useSelector((store) => store.theme.theme);
    const dispatch = useDispatch();

    function handletheme() {
        dispatch(toggleTheme());
    }

    const iconColor = theme === 'light' ? 'black' : 'white';

    return (
        <Main style={{ backgroundColor: theme === 'light' ? '#ededed' : 'black' }}>
            <Inputdiv>
                <InputGroup size='md' bg={theme === 'light' ? 'white' : 'black'}>
                    <Input
                        pr='4.5rem'
                        color={theme === 'light' ? 'black' : 'white'}
                        placeholder='Add Time Zone City or Town'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button size='md' alignItems={'center'} color={theme === 'light' ? 'black' : 'white'}>
                            +
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Inputdiv>
            <Middle>
                <Input 
                    placeholder='Select Date and Time' 
                    size='md'
                    color={theme === 'light' ? 'black' : 'white'}
                    bg={theme === 'light' ? 'white' : 'black'}
                    type='datetime-local' 
                />
            </Middle>
            <Settings iconColor={iconColor}>
                <div><IoMdAdd color={iconColor} /></div>
                <div><IoSwapVerticalSharp color={iconColor} /></div>
                <div><IoIosLink color={iconColor} /></div>
                <div onClick={handletheme}>
                    {theme === 'light' ? <MdDarkMode color={iconColor} /> : <CiLight color={iconColor} />}
                </div>
            </Settings>
        </Main>
    );
}

export default Headers;

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    align-items: center;
`;

const Inputdiv = styled.div``;

const Middle = styled.div``;

const Settings = styled.div`
  display: flex;
  font-size: x-large;

  & > div {
    flex: 1;
    border-top: 0.5px solid ${({ iconColor }) => iconColor};
    border-bottom: 0.5px solid ${({ iconColor }) => iconColor};
    padding: 10px;
    border-left: 0.5px solid ${({ iconColor }) => iconColor};
    &:hover {
      background-color: #0098ca; 
    }
  }

  & > div:first-child {
    border-left: 0.5px solid ${({ iconColor }) => iconColor};
  }

  & > div:last-child {
    border-right: 0.5px solid ${({ iconColor }) => iconColor};
    border-left: 0.5px solid ${({ iconColor }) => iconColor};
  }
`;
