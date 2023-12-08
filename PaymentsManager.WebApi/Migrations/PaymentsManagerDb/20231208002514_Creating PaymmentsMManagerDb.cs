using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaymentsManager.WebApi.Migrations.PaymentsManagerDb
{
    /// <inheritdoc />
    public partial class CreatingPaymmentsMManagerDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SpreedSheetFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdminId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpreedSheetFiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpreadSheetDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsssDiscountRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AfpDiscountRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RentDiscountRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NetSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SpreedSheetFileId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentRecords_SpreedSheetFiles_SpreedSheetFileId",
                        column: x => x.SpreedSheetFileId,
                        principalTable: "SpreedSheetFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRecords_SpreedSheetFileId",
                table: "PaymentRecords",
                column: "SpreedSheetFileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentRecords");

            migrationBuilder.DropTable(
                name: "SpreedSheetFiles");
        }
    }
}
