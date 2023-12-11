# PaymentsManager

PaymentsManager is a web application that provides a centralized platform for managing payments. It includes a Web API component located in the './paymentsManager.WebApi' directory, which serves as the backend for the application. The Web API handles various payment-related operations, such as uploading payment records and retrieving payment information. It also integrates with external payment gateways to facilitate secure and seamless transactions. The PaymentsManager project aims to simplify payment management processes and enhance the overall user experience.

## Azure Blob Storage 🗃️

To store files and payment records in the PaymentsManager project, Azure Blob Storage is used. Azure Blob Storage is a cloud-based storage solution provided by Microsoft Azure. It allows you to store and retrieve large amounts of unstructured data, such as files, images, and documents.

## Front-End configuration

In the reactpaymentsmanager.client, you will need to include a .env file in the root of the project with the url. For local testing, you can add this line:

```dotenv
VITE_API_URL=http://localhost:5266/api
```

## Connection to DataBase 📜

Then the connection to the database you will need to add a 'ConnectionStrings' with the "Manage User Secrets" options of VS community,
here is an example of the string:

```json
"ConnectionStrings:PaymentsManagerAuthDbConnectionString": "Server=DESKTOP-VJSAS0H;Database=PaymentsManagerAuthDb;Trusted_Connection=True;TrustServerCertificate=true",
```

Replace the 'ServerName' with the name of your server. Then in the Program.cs of the BankingApp.Restapi add the next line:

```cs
builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("PaymentsManagerAuthDbConnectionString")));
```

The rest of the credentials will be delivered to you personally by me 😉, and once all the credentials are entered, the application should be able to connect to the Data Base.

## Create the DataBase with Migrations ⚒️

You will need to install Microsoft SQL Server to execute this application properly in PaymentsManager.WebApi there is a folder named 'Migrations." here are the scripts that create the DataBase, to execute those scripts, you should run these commands in the Nuget Package Manger Console:

- This command will create the database needed for authozire and authenticate users.

```cli
Update-Database -Context "AuthDbContext"
```

- This command will create the database needed for managing spreedsheet file and payment records.

```cli
Update-Database -Context "PaymentsManagerDbContext"
```

Once executed, the DataBases will be created in your local machine.

## API Reference

#### Auth to App

```http
  POST /api/auth/login
```

Gives access to the application.

Controller:

#### Login([FromBody] LoginRequestDTO model)

Takes an object with two properties.

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

expected response:

```json
{
  "statusCode": 200,
  "isSuccess": true,
  "errorMessages": [],
  "result": {
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMjI2ODQ0NCwiaWF0IjoxNzAyMjY4NDQ0fQ.vcs2mB5_DePPGF82x1UOH2yHF21HEBpMYyQNk3poRx0"
  }
}
```

From this point on, you will need to include the token in the headers of every request you make to the API.

Include this in your headers:

### Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMjI2ODQ0NCwiaWF0IjoxNzAyMjY4NDQ0fQ.vcs2mB5_DePPGF82x1UOH2yHF21HEBpMYyQNk3poRx0

## Only users with the "Admin' role can access this endpoint.

#### Get list of files

```http
  GET /api/files/list
```

Return all the file records stored in the database.

Controller:

### ListContainersAsync()

expected response:

```json
[
  {
    "id": "000000000000000000000000000000000000001",
    "fileName": "payment_example1.csv",
    "filePath": "https://resource.blob.core.windows.net/spreedsheetfiles/payment_example1.csv",
    "uploadedAt": "2024-12-01"
  },
  {
    "id": "000000000000000000000000000000000000002",
    "fileName": "payment_example2.csv",
    "filePath": "https://resource.blob.core.windows.net/spreedsheetfiles/payment_example2.csv",
    "uploadedAt": "2024-12-15"
  }
]
```

### Get the example file

```http
GET /api/fles/example
```

This endpoint gives you the example file for new users.

Controller:

### GetSpreedSheetExample()

expected response:

```json
{
  "id": "1234",
  "fileName": "Example/payment_example.xlsx",
  "filePath": "https://resource.blob.core.windows.net/spreedsheetfiles/Example/payment_example.xlsx",
  "uploadedAt": "2024-12-10"
}
```

### Delete file

```http
DELETE /api/fles/{fileId}
```

This endpoint deletes a specific spreadsheet file stored in the database and all the related payment records associated with it.

Controller:

### DeleteFileAndPaymentsRecordsAsync([FromRoute] Guid fileId)

expected parameters:

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `file_id` | `string` | **Required**. |

### Delete file

```http
POST /api/fles/
```

This endpoint handles the incoming file and, if it's valid, stores it in the database with all the payment records associated with it and then saves it in azure blob storage.

Controller:

### DeleteFileAndPaymentsRecordsAsync([FromRoute] Guid fileId)

expected parameters:

| Parameter | Type       | Description                                          |
| :-------- | :--------- | :--------------------------------------------------- |
| `file`    | `FormData` | **Required**, it also should have the .csv extension |

expected response:

```json
{
  "status": "File payment_example.csv uploaded successfully",
  "error": false,
  "blod": {
    "id": "e7f4dbb8-b388-4bad-a914-e44f985178fd",
    "fileName": "payment_example.csv",
    "filePath": "https://resource.blob.core.windows.net/spreedsheetfiles/payment_example.csv",
    "uploadedAt": "2023-12-10"
  }
}
```

## Only users with the "User' role can access this endpoint.

```http
GET /api/payments/
```

This endpoint returns all the payment records associated with a specific user.

Controller:

### GetPaymentsRecords()

expected response:

```json
[
  {
    "id": "0000000000000000000000000000000000001",
    "fullName": "Anonimo Anonimo",
    "employeeCode": "0000000000000000000000000000000000030",
    "spreadSheetDate": "2024-11-15",
    "isssDiscountRate": 18,
    "afpDiscountRate": 43.5,
    "rentDiscountRate": 48.18,
    "netSalary": 490.32,
    "spreedSheetFileId": "0000000000000000000000000000000000004"
  },
  {
    "id": "0000000000000000000000000000000000002",
    "fullName": "Anonimo Anonimo",
    "employeeCode": "0000000000000000000000000000000000030",
    "spreadSheetDate": "2024-12-01",
    "isssDiscountRate": 18,
    "afpDiscountRate": 43.5,
    "rentDiscountRate": 48.18,
    "netSalary": 490.32,
    "spreedSheetFileId": "0000000000000000000000000000000000004"
  }
]
```
