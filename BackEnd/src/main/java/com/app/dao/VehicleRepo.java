package com.app.dao;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Vehicle;

public interface VehicleRepo extends JpaRepository<Vehicle, Integer> {

	List<Vehicle> findAll();
	
	@Query("SELECT v from Vehicle v where v.make.id = :makeid")
	List<Vehicle> findByMake_id(@Param("makeid") Integer makeid);
	
	Optional<Vehicle> findById(Integer id);

	@Query("select distinct v.make from Vehicle v")
	List<Object> findMake();
	
	@Query("select distinct v.model from Vehicle v where v.make=?1")
	List<Object> findModelByMake(String make);
	
	@Query("select distinct v.fuel from Vehicle v where v.model=?1")
	List<Object> findFuelByModel(String model);

	@Query("select v from Vehicle v where v.id=?1")
	Vehicle findByvehicleId(int vehicleId);
	@Query("select v.id from Vehicle v where v.make = ?1 and v.model = ?2 and v.fuel =?3")
	Object findVehicleIdByMadeModelFuel(String make, String model, String fuel);
	
	@Modifying
	@Transactional
	@Query(value="delete from vehicle where id= :vehicleId",nativeQuery = true)
	int deleteVehicle(int vehicleId);
	
	@Modifying
	@Transactional
	@Query(value="delete from item_vehicle where vehicle_id = :vehicleId",nativeQuery = true)
	int deleteVehicleFromItem_Vehicle(int vehicleId);
	
	@Modifying
	@Transactional
	@Query(value="delete from user_vehicles where vehicle_id = :vehicleId",nativeQuery = true)
	int deleteVehicleFromUser_Vehicle(@Param("vehicleId")int vehicleId);
	
	@Modifying
	@Transactional
	@Query(value="update vehicle set make=:vehicleMake,model=:vehicleModel,fuel=:vehicleFuel where id=:vehicleId",nativeQuery = true)
	int updateVehicleById(String vehicleMake, String vehicleModel, String vehicleFuel, int vehicleId);

	@Query(value="select * from vehicle where id in (select vehicle_id from user_vehicles where user_id=?1)",nativeQuery = true)
	List<Vehicle> findByUserId(int userId);
	
}
