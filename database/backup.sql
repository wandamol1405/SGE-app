-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: sge_app
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE sge_app;
--
-- Table structure for table `accountingentries`
--

DROP TABLE IF EXISTS `accountingentries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountingentries` (
  `id_acc_entry` int NOT NULL AUTO_INCREMENT,
  `id_jor_entry` int DEFAULT NULL,
  `id_account` int DEFAULT NULL,
  `credit` decimal(10,0) DEFAULT '0',
  `debit` decimal(10,0) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_acc_entry`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountingentries`
--

LOCK TABLES `accountingentries` WRITE;
/*!40000 ALTER TABLE `accountingentries` DISABLE KEYS */;
INSERT INTO `accountingentries` VALUES (1,1,1,0,8000,'2025-02-18 15:22:49','2025-02-18 15:22:49'),(2,1,4,8000,0,'2025-02-18 15:22:49','2025-02-18 15:22:49'),(3,2,1,0,6000,'2025-02-18 15:25:38','2025-02-18 15:25:38'),(4,2,2,0,1000,'2025-02-18 15:25:38','2025-02-18 15:25:38'),(5,2,4,7000,0,'2025-02-18 15:25:38','2025-02-18 15:25:38'),(6,3,1,0,6000,'2025-02-18 15:26:54','2025-02-18 15:26:54'),(7,3,2,0,1000,'2025-02-18 15:26:54','2025-02-18 15:26:54'),(8,3,4,7000,0,'2025-02-18 15:26:54','2025-02-18 15:26:54');
/*!40000 ALTER TABLE `accountingentries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id_account` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_account`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Caja','Activo','2025-02-12 00:07:30','2025-02-12 00:07:30'),(2,'Banco Cta. Cte','Activo','2025-02-12 00:09:23','2025-02-12 00:09:23'),(4,'Proveedores','Pasivo','2025-02-15 23:17:49','2025-02-15 23:17:49'),(5,'Deudores Varios','Activo','2025-02-15 23:18:15','2025-02-15 23:18:15'),(6,'Moneda Extranjera','Activo','2025-02-16 22:36:29','2025-02-16 22:36:29'),(7,'Valores a depositar','Activo','2025-02-18 20:15:17','2025-02-18 20:15:17'),(8,'Banco caja de ahorro','Activo','2025-02-18 20:15:40','2025-02-18 20:15:40'),(9,'Deudores por venta','Activo','2025-02-18 20:15:58','2025-02-18 20:15:58'),(10,'Deudores morosos','Activo','2025-02-18 20:16:19','2025-02-18 20:16:19'),(11,'Deudores en gestión judicial','Activo','2025-02-18 20:16:39','2025-02-18 20:16:39'),(12,'Documentos a cobrar','Activo','2025-02-18 20:17:00','2025-02-18 20:17:00'),(13,'Alquileres a cobrar','Activo','2025-02-18 20:17:24','2025-02-18 20:17:24'),(14,'Anticipo a proveedores','Activo','2025-02-18 20:17:46','2025-02-18 20:17:46'),(15,'Acreedores varios','Pasivo','2025-02-18 20:18:05','2025-02-18 20:18:05'),(16,'Impuestos a pagar','Pasivo','2025-02-18 20:18:53','2025-02-18 20:18:53'),(17,'Sueldos a pagar','Pasivo','2025-02-18 20:19:11','2025-02-18 20:19:11'),(18,'Seguros a pagar','Pasivo','2025-02-18 20:19:25','2025-02-18 20:19:25'),(19,'Documentos/Obligaciones a pagar','Pasivo','2025-02-18 20:19:54','2025-02-18 20:19:54'),(20,'Anticipo de clientes','Pasivo','2025-02-18 20:20:33','2025-02-18 20:20:33'),(21,'Muebles y utiles','Activo','2025-02-23 16:22:17','2025-02-23 16:22:17'),(22,'Maquinarias y equipos','Activo','2025-02-23 16:22:30','2025-02-23 16:22:30'),(23,'Inmuebles','Activo','2025-02-23 16:22:51','2025-02-23 16:22:51'),(24,'Rodados','Activo','2025-02-23 16:23:03','2025-02-23 16:23:03'),(25,'Herramientas','Activo','2025-02-23 16:23:15','2025-02-23 16:23:15'),(26,'Instalaciones','Activo','2025-02-23 16:23:30','2025-02-23 16:23:30'),(27,'Edificios','Activo','2025-02-23 16:23:42','2025-02-23 16:23:42'),(28,'Terrenos','Activo','2025-02-23 16:23:59','2025-02-23 16:23:59'),(29,'Obras en ejecución','Activo','2025-02-23 16:24:15','2025-02-23 16:24:15'),(30,'Mercaderías','Activo','2025-02-23 16:24:32','2025-02-23 16:24:32'),(31,'Materias primas','Activo','2025-02-23 16:24:43','2025-02-23 16:24:43'),(32,'Productos semielaborados','Activo','2025-02-23 16:25:21','2025-02-23 16:25:21'),(33,'Productos en proceso de elaboración','Activo','2025-02-23 16:26:02','2025-02-23 16:26:02'),(34,'Productos terminados','Activo','2025-02-23 16:26:22','2025-02-23 16:26:22'),(35,'Banco plazo fijo','Activo','2025-02-23 16:29:10','2025-02-23 16:29:10'),(36,'Moneda extranjera','Activo','2025-02-23 16:31:01','2025-02-23 16:31:01'),(37,'Inmuebles','Activo','2025-02-23 16:31:12','2025-02-23 16:31:12'),(38,'Capital','Patrimonio Neto','2025-02-23 16:31:38','2025-02-23 16:31:38'),(39,'Capital social','Patrimonio Neto','2025-02-23 16:31:48','2025-02-23 16:31:48'),(40,'Reserva legal','Patrimonio Neto','2025-02-23 16:32:06','2025-02-23 16:32:06'),(41,'Reserva estatutaria','Patrimonio Neto','2025-02-23 16:32:23','2025-02-23 16:32:23'),(42,'Reserva facultativa','Patrimonio Neto','2025-02-23 16:32:35','2025-02-23 16:32:35'),(43,'Resultado del ejercicio','Patrimonio Neto','2025-02-23 16:33:03','2025-02-23 16:33:03'),(44,'Resultado del ejercicio anterior','Patrimonio Neto','2025-02-23 16:33:18','2025-02-23 16:33:18'),(45,'Costo de mercadería vendida','Egreso','2025-02-23 16:33:43','2025-02-23 16:33:43'),(46,'Sueldos y jornales','Egreso','2025-02-23 16:33:56','2025-02-23 16:33:56'),(47,'Servicios','Egreso','2025-02-23 16:34:08','2025-02-23 16:34:08'),(48,'Impuestos','Egreso','2025-02-23 16:34:15','2025-02-23 16:34:15'),(49,'Descuentos otorgados ','Egreso','2025-02-23 16:34:31','2025-02-23 16:34:31'),(50,'Alquileres perdidos','Egreso','2025-02-23 16:34:44','2025-02-23 16:34:44'),(51,'Amortizaciones','Egreso','2025-02-23 16:34:53','2025-02-23 16:34:53'),(52,'Deudores incobrables','Egreso','2025-02-23 16:35:12','2025-02-23 16:35:12'),(53,'Gastos generales','Egreso','2025-02-23 16:35:34','2025-02-23 16:35:34'),(54,'Gastos de mantenimiento','Egreso','2025-02-23 16:35:54','2025-02-23 16:35:54'),(55,'Comisiones perdidas','Egreso','2025-02-23 16:36:11','2025-02-23 16:36:11'),(56,'Honorarios profesionales','Egreso','2025-02-23 16:36:21','2025-02-23 16:36:21'),(57,'Gastos de publicidad','Egreso','2025-02-23 16:36:37','2025-02-23 16:36:37'),(58,'Gastos de administración','Egreso','2025-02-23 16:36:54','2025-02-23 16:36:54'),(59,'Donaciones realizadas','Egreso','2025-02-23 16:37:05','2025-02-23 16:37:05'),(60,'Fletes','Egreso','2025-02-23 16:37:17','2025-02-23 16:37:17'),(61,'Descuentos por emisión','Egreso','2025-02-23 16:37:42','2025-02-23 16:37:42'),(62,'Intereses perdidos','Egreso','2025-02-23 16:37:56','2025-02-23 16:37:56'),(63,'Ventas','Ingreso','2025-02-23 16:38:07','2025-02-23 16:38:07'),(64,'Comisiones ganadas','Ingreso','2025-02-23 16:38:19','2025-02-23 16:38:19'),(65,'Alquileres ganados','Ingreso','2025-02-23 16:38:39','2025-02-23 16:38:39'),(66,'Descuentos obtenidos','Ingreso','2025-02-23 16:38:56','2025-02-23 16:38:56'),(67,'Intereses ganados','Ingreso','2025-02-23 16:39:10','2025-02-23 16:39:10'),(68,'Donaciones recibidas','Ingreso','2025-02-23 16:39:20','2025-02-23 16:39:20'),(69,'Compras','Saldo deudor','2025-02-23 16:39:35','2025-02-23 16:39:35'),(70,'Devolución de ventas','Saldo deudor','2025-02-23 16:39:50','2025-02-23 16:39:50'),(71,'Devolución de compras','Saldo acreedor','2025-02-23 16:40:05','2025-02-23 16:40:05');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyordercounters`
--

DROP TABLE IF EXISTS `buyordercounters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyordercounters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `last_buy_order_number` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyordercounters`
--

LOCK TABLES `buyordercounters` WRITE;
/*!40000 ALTER TABLE `buyordercounters` DISABLE KEYS */;
INSERT INTO `buyordercounters` VALUES (1,1,3,'2025-01-24 00:00:00','2025-02-25 15:03:27'),(2,2,1,'2025-01-24 00:00:00','2025-02-18 14:47:03');
/*!40000 ALTER TABLE `buyordercounters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyorderdetails`
--

DROP TABLE IF EXISTS `buyorderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyorderdetails` (
  `id_detail` int NOT NULL AUTO_INCREMENT,
  `id_order` int DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyorderdetails`
--

LOCK TABLES `buyorderdetails` WRITE;
/*!40000 ALTER TABLE `buyorderdetails` DISABLE KEYS */;
INSERT INTO `buyorderdetails` VALUES (1,1,'perros',60,6000,'2025-02-18 14:47:03','2025-02-18 14:47:03'),(2,2,'patos',6,5000,'2025-02-24 23:35:13','2025-02-24 23:35:13'),(3,1,'pantalones wid leg',6,30000,'2025-02-25 15:03:06','2025-02-25 15:03:06'),(4,2,'pantalones wid leg',6,30000,'2025-02-25 15:03:27','2025-02-25 15:03:27');
/*!40000 ALTER TABLE `buyorderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyorders`
--

DROP TABLE IF EXISTS `buyorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyorders` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `order_number` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `sale_condition` varchar(255) DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `supplier_address` varchar(255) DEFAULT NULL,
  `supplier_cuit` varchar(255) DEFAULT NULL,
  `supplier_condition` varchar(45) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_order`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyorders`
--

LOCK TABLES `buyorders` WRITE;
/*!40000 ALTER TABLE `buyorders` DISABLE KEYS */;
INSERT INTO `buyorders` VALUES (1,2,'2025-02-04 00:00:00','2025-02-16 00:00:00','Contado',1,'Beka ','Independencia 625','20436761231','Responsable inscripto',180000,'2025-02-25 15:03:06','2025-02-25 15:03:06'),(2,3,'2025-02-04 00:00:00','2025-02-16 00:00:00','Contado',1,'Beka ','Independencia 625','20436761231','Responsable inscripto',180000,'2025-02-25 15:03:27','2025-02-25 15:03:27');
/*!40000 ALTER TABLE `buyorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cheques`
--

DROP TABLE IF EXISTS `cheques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheques` (
  `id_cheque` int NOT NULL AUTO_INCREMENT,
  `id_company` int DEFAULT NULL,
  `cheque_num` int DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `issue_place` varchar(255) DEFAULT NULL,
  `cheque_type` varchar(255) DEFAULT NULL,
  `emission_mode` varchar(255) DEFAULT NULL,
  `certified` tinyint(1) DEFAULT NULL,
  `crossed` tinyint(1) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `collection_date` datetime DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_cheque`),
  KEY `id_company` (`id_company`),
  CONSTRAINT `cheques_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheques`
--

LOCK TABLES `cheques` WRITE;
/*!40000 ALTER TABLE `cheques` DISABLE KEYS */;
INSERT INTO `cheques` VALUES (1,2,60000,'Banco Nación','2025-01-30 00:00:00','Arroyo de los Patos','Común','Al portador',1,0,'No corresponde',6000,NULL,'6153129874631','2025-02-18 15:12:46','2025-02-18 15:12:46'),(2,1,3261456,'Banco Nación','2025-02-13 00:00:00','Córdoba, Córdoba','Común','Al portador',1,1,'No corresponde',60000,NULL,'1231954986123','2025-02-25 13:17:08','2025-02-25 13:17:08'),(3,1,306165,'Banco Córdoba','2025-02-07 00:00:00','Villa Dolores, Córdoba','Diferido','Al portador',0,1,'No corresponde',90000,'2025-02-28 00:00:00','123941983465','2025-02-25 13:20:07','2025-02-25 13:20:07'),(4,1,306165,'Banco Córdoba','2025-02-07 00:00:00','Villa Dolores, Córdoba','Diferido','Al portador',0,1,'No corresponde',90000,'2025-02-28 00:00:00','123941983465','2025-02-25 13:20:34','2025-02-25 13:20:34'),(5,1,306165,'Banco Córdoba','2025-02-07 00:00:00','Villa Dolores, Córdoba','Diferido','Al portador',0,1,'No corresponde',90000,'2025-02-28 00:00:00','123941983465','2025-02-25 13:21:33','2025-02-25 13:21:33'),(6,1,306165,'Banco Córdoba','2025-02-07 00:00:00','Villa Dolores, Córdoba','Diferido','Al portador',0,1,'No corresponde',90000,'2025-02-28 00:00:00','123941983465','2025-02-25 13:22:49','2025-02-25 13:22:49'),(7,1,1261020306,'Banco Galicia','2025-02-01 00:00:00','Villa Cura Brochero, Córdoba','Común','Al portador',0,0,'No corresponde',50000,NULL,'1323026149651','2025-02-25 13:27:05','2025-02-25 13:27:05');
/*!40000 ALTER TABLE `cheques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditnotecounters`
--

DROP TABLE IF EXISTS `creditnotecounters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditnotecounters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_company` int DEFAULT NULL,
  `credit_note_type` varchar(45) DEFAULT NULL,
  `last_credit_note_number` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditnotecounters`
--

LOCK TABLES `creditnotecounters` WRITE;
/*!40000 ALTER TABLE `creditnotecounters` DISABLE KEYS */;
INSERT INTO `creditnotecounters` VALUES (1,1,'Nota de Crédito A',0,'2025-01-24 00:00:00','2025-02-25 13:58:08'),(2,1,'Nota de Crédito B',0,'2025-01-24 00:00:00','2025-02-18 14:55:29'),(3,1,'Nota de Credito C',0,'2025-02-18 14:55:29','2025-02-18 14:55:29'),(4,2,'Nota de Crédito A',0,'2025-02-18 14:55:29','2025-02-18 14:55:29'),(5,2,'Nota de Crédito B',0,'2025-02-18 14:55:29','2025-02-18 14:55:29'),(6,2,'Nota de Crédito C',0,'2025-02-18 14:55:29','2025-02-18 14:55:29');
/*!40000 ALTER TABLE `creditnotecounters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditnotedetails`
--

DROP TABLE IF EXISTS `creditnotedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditnotedetails` (
  `id_credit_note_detail` int NOT NULL AUTO_INCREMENT,
  `id_credit_note` int DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_credit_note_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditnotedetails`
--

LOCK TABLES `creditnotedetails` WRITE;
/*!40000 ALTER TABLE `creditnotedetails` DISABLE KEYS */;
INSERT INTO `creditnotedetails` VALUES (1,1,'patas',60,600,'2025-02-18 14:55:28','2025-02-18 14:55:28'),(2,2,'remeras',3,2000,'2025-02-23 22:51:12','2025-02-23 22:51:12'),(3,3,'doritos',9,2000,'2025-02-25 13:42:48','2025-02-25 13:42:48'),(4,4,'doritos',9,2000,'2025-02-25 13:44:37','2025-02-25 13:44:37'),(5,5,'papas lays',6,3000,'2025-02-25 13:51:54','2025-02-25 13:51:54'),(6,6,'papas lays',6,3000,'2025-02-25 13:58:08','2025-02-25 13:58:08');
/*!40000 ALTER TABLE `creditnotedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditnotes`
--

DROP TABLE IF EXISTS `creditnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditnotes` (
  `id_credit_note` int NOT NULL AUTO_INCREMENT,
  `type_credit_note` varchar(255) DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `num_credit_note` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `buyer_address` varchar(255) DEFAULT NULL,
  `buyer_IVA_condition` varchar(255) DEFAULT NULL,
  `buyer_cuit` varchar(255) DEFAULT NULL,
  `sale_condition` varchar(255) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `IVA_total` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_credit_note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditnotes`
--

LOCK TABLES `creditnotes` WRITE;
/*!40000 ALTER TABLE `creditnotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `creditnotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditnotesreceived`
--

DROP TABLE IF EXISTS `creditnotesreceived`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditnotesreceived` (
  `credit_note_received_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `type_credit_note` varchar(255) DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `credit_note_number` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `IVA` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`credit_note_received_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditnotesreceived`
--

LOCK TABLES `creditnotesreceived` WRITE;
/*!40000 ALTER TABLE `creditnotesreceived` DISABLE KEYS */;
INSERT INTO `creditnotesreceived` VALUES (1,1,'Nota de Crédito A',6,5169,'2025-02-13 00:00:00','PAPARAMERICANA',10000,2100,12100,'2025-03-05 15:39:35','2025-03-05 15:39:35'),(2,1,'Nota de Crédito A',3000,1594,'2025-02-04 00:00:00','AFUB',23500,4935,28435,'2025-03-05 16:58:55','2025-03-05 16:58:55'),(3,1,'Nota de Crédito B',6000,5491,'2025-02-16 00:00:00','GVH',0,0,3000,'2025-03-05 17:01:04','2025-03-05 17:01:04');
/*!40000 ALTER TABLE `creditnotesreceived` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debitnotecounters`
--

DROP TABLE IF EXISTS `debitnotecounters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debitnotecounters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_company` int DEFAULT NULL,
  `debit_note_type` varchar(45) DEFAULT NULL,
  `last_debit_note_number` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debitnotecounters`
--

LOCK TABLES `debitnotecounters` WRITE;
/*!40000 ALTER TABLE `debitnotecounters` DISABLE KEYS */;
INSERT INTO `debitnotecounters` VALUES (1,1,'Nota de Débito A',0,'2025-01-24 00:00:00','2025-02-25 14:11:31'),(2,1,'Nota de Débito B',0,'2025-01-24 00:00:00','2025-02-18 14:11:04'),(3,1,'Nota de Débito C',0,'2025-02-18 14:11:04','2025-02-18 14:11:04'),(4,2,'Nota de Débito A',0,'2025-02-18 14:11:04','2025-02-18 14:11:04'),(5,2,'Nota de Débito B',0,'2025-02-18 14:11:04','2025-02-18 14:11:04'),(6,2,'Nota de Débito C',0,'2025-02-18 14:11:04','2025-02-18 14:11:04');
/*!40000 ALTER TABLE `debitnotecounters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debitnotedetails`
--

DROP TABLE IF EXISTS `debitnotedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debitnotedetails` (
  `id_debit_note_detail` int NOT NULL AUTO_INCREMENT,
  `id_debit_note` int DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_debit_note_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debitnotedetails`
--

LOCK TABLES `debitnotedetails` WRITE;
/*!40000 ALTER TABLE `debitnotedetails` DISABLE KEYS */;
INSERT INTO `debitnotedetails` VALUES (1,1,'hola',60,10,'2025-02-18 14:11:04','2025-02-18 14:11:04'),(2,2,'pantalones',2,6000,'2025-02-23 22:46:13','2025-02-23 22:46:13'),(3,3,'kilo de arroz',6,900,'2025-02-25 14:11:31','2025-02-25 14:11:31');
/*!40000 ALTER TABLE `debitnotedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debitnotes`
--

DROP TABLE IF EXISTS `debitnotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debitnotes` (
  `id_debit_note` int NOT NULL AUTO_INCREMENT,
  `type_debit_note` varchar(255) DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `num_debit_note` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `buyer_address` varchar(255) DEFAULT NULL,
  `buyer_IVA_condition` varchar(255) DEFAULT NULL,
  `buyer_cuit` varchar(255) DEFAULT NULL,
  `sale_condition` varchar(255) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `IVA_total` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_debit_note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debitnotes`
--

LOCK TABLES `debitnotes` WRITE;
/*!40000 ALTER TABLE `debitnotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `debitnotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debitnotesreceived`
--

DROP TABLE IF EXISTS `debitnotesreceived`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debitnotesreceived` (
  `debit_note_received_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `type_debit_note` varchar(255) DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `debit_note_number` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `IVA` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`debit_note_received_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debitnotesreceived`
--

LOCK TABLES `debitnotesreceived` WRITE;
/*!40000 ALTER TABLE `debitnotesreceived` DISABLE KEYS */;
INSERT INTO `debitnotesreceived` VALUES (1,1,'Nota de Débito B',5,5619,'2025-03-07 00:00:00','VYGV',0,0,1000,'2025-03-04 02:03:17','2025-03-04 02:03:17'),(2,1,'Nota de Débito A',6,9514,'2025-02-11 00:00:00','FVSH',12600,2646,15246,'2025-03-05 17:08:52','2025-03-05 17:08:52'),(3,1,'Nota de Débito B',9,61592,'2025-02-09 00:00:00','CFYY',0,0,6000,'2025-03-05 17:09:15','2025-03-05 17:09:15');
/*!40000 ALTER TABLE `debitnotesreceived` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliverynotecounters`
--

DROP TABLE IF EXISTS `deliverynotecounters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliverynotecounters` (
  `id_delivery_note_counter` int NOT NULL AUTO_INCREMENT,
  `id_company` int DEFAULT NULL,
  `delivery_note_type` varchar(45) DEFAULT NULL,
  `last_delivery_note_number` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_delivery_note_counter`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliverynotecounters`
--

LOCK TABLES `deliverynotecounters` WRITE;
/*!40000 ALTER TABLE `deliverynotecounters` DISABLE KEYS */;
INSERT INTO `deliverynotecounters` VALUES (1,1,'Remito R',0,'2025-02-05 00:19:20','2025-02-25 14:24:41'),(2,1,'Remito X',0,'2025-02-05 00:19:20','2025-02-18 15:06:49'),(3,2,'Remito R',0,'2025-02-05 00:19:20','2025-02-05 00:19:20'),(4,2,'Remito X',0,'2025-02-05 00:19:20','2025-02-05 00:19:20');
/*!40000 ALTER TABLE `deliverynotecounters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliverynotedetails`
--

DROP TABLE IF EXISTS `deliverynotedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliverynotedetails` (
  `id_delivery_note_detail` int NOT NULL AUTO_INCREMENT,
  `id_delivery_note` int DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_delivery_note_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliverynotedetails`
--

LOCK TABLES `deliverynotedetails` WRITE;
/*!40000 ALTER TABLE `deliverynotedetails` DISABLE KEYS */;
INSERT INTO `deliverynotedetails` VALUES (1,1,'patas',2,6000,'2025-02-18 15:06:49','2025-02-18 15:06:49'),(2,2,'ladrillos de merca',6,15000,'2025-02-25 14:24:41','2025-02-25 14:24:41');
/*!40000 ALTER TABLE `deliverynotedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliverynotes`
--

DROP TABLE IF EXISTS `deliverynotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliverynotes` (
  `id_delivery_note` int NOT NULL AUTO_INCREMENT,
  `type_delivery_note` varchar(255) DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `num_delivery_note` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `buyer_address` varchar(255) DEFAULT NULL,
  `buyer_IVA_condition` varchar(255) DEFAULT NULL,
  `buyer_cuit` varchar(255) DEFAULT NULL,
  `sale_condition` varchar(255) DEFAULT NULL,
  `means_of_delivery` varchar(255) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_delivery_note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliverynotes`
--

LOCK TABLES `deliverynotes` WRITE;
/*!40000 ALTER TABLE `deliverynotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliverynotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoicecounters`
--

DROP TABLE IF EXISTS `invoicecounters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicecounters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `invoice_type` varchar(45) DEFAULT NULL,
  `last_invoice_number` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicecounters`
--

LOCK TABLES `invoicecounters` WRITE;
/*!40000 ALTER TABLE `invoicecounters` DISABLE KEYS */;
INSERT INTO `invoicecounters` VALUES (1,1,'Factura A',2,'2025-01-24 00:00:00','2025-02-25 20:34:24'),(2,1,'Factura B',0,'2025-01-24 00:00:00','2025-02-25 20:27:17'),(3,1,'Factura C',1,'2025-01-24 00:00:00','2025-02-25 20:32:59'),(4,2,'Factura A',0,'2025-01-24 00:00:00','2025-01-24 00:00:00'),(5,2,'Factura B',0,'2025-01-24 00:00:00','2025-01-24 00:00:00'),(6,2,'Factura C',0,'2025-01-24 00:00:00','2025-01-24 00:00:00');
/*!40000 ALTER TABLE `invoicecounters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoicedetails`
--

DROP TABLE IF EXISTS `invoicedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicedetails` (
  `id_invoice_detail` int NOT NULL AUTO_INCREMENT,
  `id_invoice` int DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `sale_price` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_invoice_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicedetails`
--

LOCK TABLES `invoicedetails` WRITE;
/*!40000 ALTER TABLE `invoicedetails` DISABLE KEYS */;
INSERT INTO `invoicedetails` VALUES (1,1,'perros',60,10,'2025-02-18 13:57:47','2025-02-18 13:57:47'),(2,2,'hamburguesas',10,6000,'2025-02-20 18:23:28','2025-02-20 18:23:28'),(3,2,'papas fritas',20,3000,'2025-02-20 18:23:28','2025-02-20 18:23:28'),(4,3,'remeras',6,9000,'2025-02-25 14:45:31','2025-02-25 14:45:31'),(5,1,'muslos',6,6000,'2025-02-25 20:25:31','2025-02-25 20:25:31'),(6,1,'hamburguesas',4,2000,'2025-02-25 20:25:31','2025-02-25 20:25:31'),(7,2,'remeras verdes ',9,9000,'2025-02-25 20:27:17','2025-02-25 20:27:17'),(8,1,'kilos de pechugas de pollo',6,9000,'2025-02-25 20:31:38','2025-02-25 20:31:38'),(9,2,'remeras verdes',7,4000,'2025-02-25 20:32:59','2025-02-25 20:32:59'),(10,3,'papas fritas ',5,2000,'2025-02-25 20:34:24','2025-02-25 20:34:24');
/*!40000 ALTER TABLE `invoicedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id_invoice` int NOT NULL AUTO_INCREMENT,
  `type_invoice` varchar(255) DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `num_invoice` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `buyer_address` varchar(255) DEFAULT NULL,
  `buyer_IVA_condition` varchar(255) DEFAULT NULL,
  `buyer_cuit` varchar(255) DEFAULT NULL,
  `sale_condition` varchar(45) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `IVA_total` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_invoice`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'Factura A',1,1,'2025-02-06 00:00:00',1,'Lucas Marchetti','Ituzaingo 216','Responsable inscripto','20436761231','Contado',54000,11340,65340,'2025-02-25 20:31:38','2025-02-25 20:31:38'),(2,'Factura C',1,1,'2025-02-14 00:00:00',1,'Pedro Gonzales','Rondeau 561','Consumidor final','20436761231','Cuenta corriente',28000,5880,33880,'2025-02-25 20:32:59','2025-02-25 20:32:59'),(3,'Factura A',1,2,'2025-02-13 00:00:00',1,'Laura Guzman','San Lorenzo 5614','Responsable inscripto','20436761231','Contado',10000,2100,12100,'2025-02-25 20:34:24','2025-02-25 20:34:24');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoicesreceived`
--

DROP TABLE IF EXISTS `invoicesreceived`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoicesreceived` (
  `invoice_received_id` int NOT NULL AUTO_INCREMENT,
  `type_invoice` varchar(255) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `point_sale` int DEFAULT NULL,
  `invoice_number` int DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `IVA` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`invoice_received_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicesreceived`
--

LOCK TABLES `invoicesreceived` WRITE;
/*!40000 ALTER TABLE `invoicesreceived` DISABLE KEYS */;
INSERT INTO `invoicesreceived` VALUES (1,'Factura A',NULL,6,5163,'2025-03-14 00:00:00','PABLO SRL',10000,2100,12100,'2025-03-03 23:31:51','2025-03-03 23:31:51'),(2,'Factura A',1,6,1595,'2025-03-13 00:00:00','PEREZ SA',1000,210,1210,'2025-03-03 23:34:24','2025-03-03 23:34:24'),(3,'Factura A',1,6,1569,'2025-02-05 00:00:00','PEPE',45300,9513,54813,'2025-03-03 23:38:25','2025-03-03 23:38:25'),(4,'Factura B',NULL,5,12354,'2025-02-05 00:00:00','PNU',0,0,1000,'2025-03-04 01:54:57','2025-03-04 01:54:57'),(5,'Factura A',1,3,8494,'2025-02-11 00:00:00','CANCAN',10000,2100,12100,'2025-03-05 15:55:32','2025-03-05 15:55:32'),(6,'Factura B',1,5000,65231,'2025-02-15 00:00:00','TANGALANGA',0,0,6000,'2025-03-05 15:58:21','2025-03-05 15:58:21'),(7,'Factura A',1,3,1563,'2025-02-11 00:00:00','PARAPAPA',2000,420,2420,'2025-03-05 15:58:54','2025-03-05 15:58:54'),(8,'Factura B',1,6,5948,'2025-02-19 00:00:00','DOAP',0,0,6000,'2025-03-05 16:53:14','2025-03-05 16:53:14');
/*!40000 ALTER TABLE `invoicesreceived` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journalentries`
--

DROP TABLE IF EXISTS `journalentries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journalentries` (
  `id_entry` int NOT NULL AUTO_INCREMENT,
  `id_company` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `total_debit` decimal(10,0) DEFAULT NULL,
  `total_credit` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_entry`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journalentries`
--

LOCK TABLES `journalentries` WRITE;
/*!40000 ALTER TABLE `journalentries` DISABLE KEYS */;
INSERT INTO `journalentries` VALUES (1,2,'2025-02-19 00:00:00','Por mercadería',8000,8000,'2025-02-18 15:22:49','2025-02-18 15:22:49'),(2,2,'2025-02-04 00:00:00','Por mercadería',7000,7000,'2025-02-18 15:25:38','2025-02-18 15:25:38'),(3,2,'2025-02-04 00:00:00','Por mercadería',7000,7000,'2025-02-18 15:26:54','2025-02-18 15:26:54');
/*!40000 ALTER TABLE `journalentries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promissorynotes`
--

DROP TABLE IF EXISTS `promissorynotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promissorynotes` (
  `id_promissory_note` int NOT NULL AUTO_INCREMENT,
  `issue_date` datetime DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `issue_place` varchar(255) DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `manturity_date` datetime DEFAULT NULL,
  `manturity_days` int DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `pay_place` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_promissory_note`),
  KEY `id_company` (`id_company`),
  CONSTRAINT `promissorynotes_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promissorynotes`
--

LOCK TABLES `promissorynotes` WRITE;
/*!40000 ALTER TABLE `promissorynotes` DISABLE KEYS */;
INSERT INTO `promissorynotes` VALUES (1,'2025-02-12 00:00:00',2,'Mina Clavero',6000,NULL,NULL,'Pedro','Arroyo de los Patos','2025-02-18 15:17:20','2025-02-18 15:17:20'),(2,'2025-02-13 00:00:00',2,'Arroyo de los Patos',9000,'2025-02-20 00:00:00',NULL,'Pedro','Mina Clavero','2025-02-18 15:19:06','2025-02-18 15:19:06'),(3,'2025-02-20 00:00:00',2,'Mina Clavero',9000,NULL,30,'Pedro','Arroyo de los Patos','2025-02-18 15:20:25','2025-02-18 15:20:25'),(4,'2025-02-06 00:00:00',1,'Villa Dolores, Córdoba',50000,'2025-02-16 00:00:00',NULL,'Javier Milei','CABA, Buenos Aires','2025-02-25 15:23:02','2025-02-25 15:23:02');
/*!40000 ALTER TABLE `promissorynotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20250110221403-create-user.js'),('20250114234145-create-factura.js'),('20250115003043-create-invoice-detail.js'),('20250120232111-create-invoice-counters.js'),('20250203224010-create-buy-order.js'),('20250203224823-create-buy-order-detail.js'),('20250203225300-create-buy-order-counter.js'),('20250204203727-create-debit-note.js'),('20250204204050-create-credit-note.js'),('20250204204725-create-debit-note-detail.js'),('20250204205033-create-credit-note-detail.js'),('20250204205411-create-debit-note-counter.js'),('20250204205636-create-credit-note-counter.js'),('20250205030455-create-delivery-note.js'),('20250205030954-create-delivery-note-detail.js'),('20250205031251-create-delivery-note-counter.js'),('20250205220627-create-cheque.js'),('20250206212607-create-promissory-note.js'),('20250210220744-create-accounting-entry.js'),('20250210220744-create-journal-entry.js'),('20250210222142-create-account.js'),('20250210223547-create-accounting-entry.js'),('20250225213447-create-invoice-recieved.js'),('20250304001031-create-debit-note-received.js'),('20250305150002-create-credit-note-received.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `cuit` varchar(255) DEFAULT NULL,
  `gross_revenue` int DEFAULT NULL,
  `business_address` varchar(255) DEFAULT NULL,
  `IVA_condition` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'NanuStore','27436761231',123456789,'Las Rosas','Responsable inscripto','2025-01-15 00:00:00','nanustore@gmail.com','simbaeva2020',0,'2025-01-18 23:48:15','2025-01-18 23:48:15'),(2,'carlota','0',0,'sin detalle','sin detalle','1971-01-01 00:00:00','carlota@gmail.com','simba71',1,'2025-02-11 20:04:00','2025-02-11 20:04:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 17:06:13
