//React Imports
import React, { useEffect } from 'react'
import { useState } from 'react'

//MUI Imports
//import { Box, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { getData } from 'src/api/axios'
import { Box, Paper, Typography } from '@mui/material'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import ThaiGiaCamForm from './form/NguonThaiGiaCamForm'

// eslint-disable-next-line react-hooks/rules-of-hooks
const NguonThaiDien_GiaCam = () => {
  //Init columnTable

  // const [mapCenter, setMapCenter] = useState([21.358822,105.1078751])
  // const [mapZoom, setMapZoom] = useState(9)
  // const [showLabel, setShowLabel] = useState(false)
  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', rowspan: 2 },
    {
      id: '#',
      label: 'Sông',
      rowspan: 2,
      align: 'left',
      minWidth: 200,
      elm: (row: any) => <span>{row.phanDoanSong.song}</span>
    },
    {
      id: '#',
      label: (
        <>
          Tên đoạn <br /> sông
        </>
      ),
      rowspan: 2,
      align: 'left',
      minWidth: 100,
      elm: (row: any) => <span>{row.phanDoanSong.tenDoanSong}</span>
    },
    {
      id: 'chieuDai',
      label: (
        <>
          Chiều dài <br /> đoạn sông <br /> (km)
        </>
      ),
      rowspan: 2,
      align: 'left',
      minWidth: 100,
      elm: (row: any) => <span>{row.phanDoanSong.chieuDai}</span>
    },
    {
      id: 'soGiaCam',
      label: (
        <>
          Số lợn
          <br /> (con) <br />
        </>
      ),
      rowspan: 2,
      align: 'left',
      minWidth: 100
    },

    {
      id: 'heSoSuyGiam',
      label: (
        <>
          Hệ số suy giảm dọc đường <br /> hay hệ số dòng chảy
        </>
      ),
      rowspan: 2,
      align: 'left'
    },
    {
      id: '#',
      label: (
        <>
          TẢI LƯỢNG Ô NHIỄM (PLU) NGUỒN THẢI DIỆN (LỢN, DÊ...) <br />
          (g/người/ngày)
        </>
      ),
      align: 'left',
      children: [
        {
          id: 'ctGiaCamBOD',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ctGiaCamCOD',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ctGiaCamAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ctGiaCamTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ctGiaCamTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ctGiaCamTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ctGiaCamColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left'
        }
      ]
    },

    //lnn
    {
      id: '#',
      label: (
        <>
          TẢI LƯỢNG THÔNG SỐ CHẤT LƯỢNG NƯỚC CÓ TRONG NGUỒN THẢI DIỆN (CHĂN NUÔI GIA SÚC)
          <br /> Lt_dien_GiaCam (kg/ngày)
        </>
      ),
      align: 'left',
      children: [
        {
          id: 'ltGiaCamBOD',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ltGiaCamCOD',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ltGiaCamAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ltGiaCamTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ltGiaCamTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ltGiaCamTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left'
        },
        {
          id: 'ltGiaCamColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left'
        }
      ]
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      rowspan: 2,
      align: 'left'
    },

    { id: 'actions', label: 'Thao tác', rowspan: 2, align: 'center', pinned: 'right' }
  ]

  const [data, setData] = useState([])
  console.log(data)

  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('DuLieuNguonNuocThaiGiaCam/danh-sach')
        .then(data => {
          setData(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    getDataReport1()
  }, [postSuccess])

  // const zoomConstruction = (coords: any) => {
  //   setMapCenter(coords)
  //   setMapZoom(13)
  // }
  // const handleConsTypeChange = (data: any) => {
  //   setInitConstype(data);
  // };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
      <Grid className='_text_center'>
          <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
            THỐNG KÊ TẢI LƯỢNG CHẤT Ô NHIỄM TỪ NGUỒN THẢI GIA CẦM XẢ VÀO ĐOẠN SÔNG SUỐI TỈNH QUẢNG NGÃI
          </Typography>
        </Grid>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <Grid className='_flexEnd'>
            <ThaiGiaCamForm isEdit={false} setPostSuccess={handlePostSuccess} />
          </Grid>
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box display={'flex'}>
                <ThaiGiaCamForm isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'du-lieu-nguon-nhan'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default NguonThaiDien_GiaCam
