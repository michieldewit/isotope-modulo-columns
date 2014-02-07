# moduloColumns layout mode for Isotope 2

Organizes items in a column grid by distributing items evenly over the columns. This layout mode does not
attempt to even out the column lengths, but rather strives to even out the number of items per column.

``` js
$('#container').isotope({
  layoutMode: 'moduloColumns',
  moduloColumns: {
    columnWidth: 200,
    gutter: 20
  }
});
```
