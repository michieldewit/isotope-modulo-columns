/**
 * moduloColumns layout mode for Isotope 2
 * This layout mode does currently not support stamping
 * @author Michiel de Wit <mail@michieldewit.nl>
 */
(function(window) {

    'use strict';

    function moduloColumnsLayoutModeDefinition(LayoutMode) {
        var ModuloColumns = LayoutMode.create('moduloColumns');

        /**
         * Called every time the layout if reevaluated
         */
        ModuloColumns.prototype._resetLayout = function() {
            // Get column width and gutter size
            this.getColumnWidth();
            this._getMeasurement('gutter', 'outerHeight');
            this.getSize()

            // Add gutter and adjust column width/count accordingly
            var gutter = this.options.gutter || 0;
            var containerWidth = this.size.innerWidth;
            this.columnWidth += gutter;
            var cols = this.cols = Math.floor((containerWidth + gutter) / this.columnWidth) || 1;

            // Initialize column heights to zero
            this.columnHeights = [];
            while (cols--) this.columnHeights.push(0);
            this.currentColumn = 0;
        };

        /**
         * Determines the position for each consecutive element
         * @param item Item to be positioned.
         * @returns {{x: number, y: number}}
         */
        ModuloColumns.prototype._getItemLayoutPosition = function(item) {
            // Determine item size
            item.getSize();
            var itemWidth = item.size.outerWidth, itemHeight = item.size.outerHeight;
            var itemCols = Math.min(this.cols, Math.ceil(itemWidth / this.columnWidth));

            // See if item still fits in current column; otherwise go back to column 0
            if (this.currentColumn + itemCols > this.cols) {
                this.currentColumn = 0;
            }

            // Find longest column as use length
            var maxHeight = 0;
            for (var offset = 0; offset < itemCols; offset++) {
                maxHeight = Math.max(maxHeight, this.columnHeights[this.currentColumn + offset]);
            }

            // Update column heights with new height
            var newColumnHeight = maxHeight + itemHeight;
            for (offset = 0; offset < itemCols; offset++) {
                this.columnHeights[this.currentColumn + offset] = newColumnHeight;
            }

            // Got all we need
            var position = {
                x: this.currentColumn * this.columnWidth,
                y: maxHeight
            };

            // Update column pointer
            this.currentColumn += itemCols;
            if (this.currentColumn > this.cols) {
                this.currentColumn = 0;
            }

            return position;
        };

        /**
         * Calculates the size of the container
         * @returns {{height: number}}
         */
        ModuloColumns.prototype._getContainerSize = function() {
            return {
                height: Math.max.apply(Math, this.columnHeights)
            }
        };

    }

    // Load definition, either synchronously or asynchronously
    if ('function' === typeof define && define.amd) {
        // Use Asynchronous Module Definition (AMD)
        define(
            [   // Dependencies
                'isotope/js/layout-mode'
            ],
            moduloColumnsLayoutModeDefinition
        )
    } else {
        // Load synchronously
        moduloColumnsLayoutModeDefinition(
            (window.Isotope.LayoutMode)
        );
    }

})(window);

