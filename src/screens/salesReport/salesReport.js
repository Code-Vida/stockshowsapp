import React from 'react'
import { DataTable } from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Controller } from 'react-hook-form'
import { Button, Snackbar } from 'react-native-paper'

import useSalesReport from './use-sales-report/use-sales-report'
import { DatePickerInput, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', {
  save: 'Salvar',
  selectSingle: 'Selecione',
  selectMultiple: 'Selecione',
  selectRange: 'Selecione',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Voltar',
  next: 'Próximo',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Selecione a data no calendário',
  close: 'Fechar',
})
const SalesReport = () => {
  const {
    control,
    handleSubmit,
    submit,
    formState,
    salesReport,
    visible,
    onDismissSnackBar,
    message,
  } = useSalesReport()

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Controller
          control={control}
          defaultValue=""
          name="salesDate"
          render={({ field }) => {
            return (
              <>
                <DatePickerInput
                  style={styles.input}
                  locale="pt"
                  label="Data"
                  value={field.value ? new Date(field.value) : field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  inputMode="start"
                  autoComplete="birthdate-full"
                />
              </>
            )
          }}
        />
        <Button
          mode="contained"
          icon="search-web"
          onPress={handleSubmit(submit)}
          disabled={!formState.isValid}
        >
          Buscar
        </Button>
      </View>

      <View style={styles.box}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.title}>Marca</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Modelo</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>Cor</DataTable.Title>
            <DataTable.Title textStyle={styles.title}>
              Quantidade
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {salesReport &&
              salesReport.map((item) => {
                return (
                  <DataTable.Row key={item._id}>
                    <DataTable.Cell
                      style={styles.title}
                      textStyle={styles.title}
                    >
                      {item.product.brand}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.title}>
                      {item.product.model}
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.title}>
                      {item.product.color}
                    </DataTable.Cell>
                    <DataTable.Cell numeric textStyle={styles.title}>
                      1
                    </DataTable.Cell>
                  </DataTable.Row>
                )
              })}
          </ScrollView>
          {/* <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />  */}
        </DataTable>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Fechar',
          onPress: () => {
            // Do something
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  )
}

export default SalesReport

const styles = StyleSheet.create({
  title: {
    color: '#000',
  },
  container: {
    flex: 1,
    padding: 5,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
})
