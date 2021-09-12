import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  let timeout = 0;
  const handleSearchText = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const text = event.target.value;
      if (text && text.length > 3) {
        console.debug(text);
        setSearchText(text);
      }
    }, 1000);
  };

  useEffect(() => {
    if (searchText && searchText.length > 3) {
      fetch(`http://localhost:5004/api/coffees/search/:${searchText}`)
        .then((res) => res.json())
        .then((data) => {
          console.debug(data);
          setProducts(data);
        })
        .then(navigate('/app/products', { state: { searchText, products }, replace: true }));
    }
  }, [searchText]);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        onSearchTextChange={handleSearchText}
        text={searchText}
        results={products || []}
      />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet text={searchText} results={products || []} />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
