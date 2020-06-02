
from flask import Flask, render_template, jsonify, redirect
import pandas as pd
import get_data

app = Flask(__name__)
app._static_folder = 'static/'

# load the tickers we want into a dataframe
tickers = pd.DataFrame({
    'Sector' : ['Retail', 'Retail', 'Tech', 'Tech', 'Entertainment', 'Entertainment', 'Ecommerce', 'Ecommerce', 'Airline', 'Airline'],
    'Name' : ['Walmart', 'Target', 'Nvidia', 'Zoom', 'Spotify', 'Netflix', 'Amazon', 'Shopify', 'Delta', 'United Airlines'],
    'Ticker' : ['WMT', 'TGT', 'NVDA', 'ZM', 'SPOT', 'NFLX', 'AMZN', 'SHOP', 'DAL', 'UAL'],
})


@app.route("/")
def index():

    stock_data = get_data.main()

    return render_template('index.html', stock_data = stock_data)


if __name__ == "__main__":
    app.run(debug=True)
