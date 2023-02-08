import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';

const numberOfItemsPerPageList = [1, 3, 5];

const headers = [
  {
    id: 1,
    title: 'Name',
  },
  {
    id: 2,
    title: 'Value',
  },
];

const items = [
  {
    key: 1,
    name: 'Data 1',
    value: 'Sample 1',
  },
  {
    key: 2,
    name: 'Data 2',
    value: 'Sample 2',
  },
  {
    key: 3,
    name: 'Data 3',
    value: 'Sample 3',
  },
  {
    key: 4,
    name: 'Data 4',
    value: 'Sample 4',
  },
  {
    key: 5,
    name: 'Data 5',
    value: 'Sample 5',
  },
  {
    key: 6,
    name: 'Data 6',
    value: 'Sample 6',
  },
  {
    key: 7,
    name: 'Data 7',
    value: 'Sample 7',
  },
];

const Cek = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const tableheader = header => (
    <DataTable.Title key={header.id}>{header.title}</DataTable.Title>
  );

  const tableRow = item => (
    <DataTable.Row key={item.key}>
      <DataTable.Cell>{item.name}</DataTable.Cell>
      <DataTable.Cell>{item.value}</DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <PaperProvider>
      <DataTable>
        <DataTable.Header>
          {headers.map(header => tableheader(header))}
        </DataTable.Header>

        {items
          .slice(
            page * numberOfItemsPerPage,
            page * numberOfItemsPerPage + numberOfItemsPerPage,
          )
          .map(row => tableRow(row))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </PaperProvider>
  );
};

export default Cek;
